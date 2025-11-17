import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// Mock MongoDB
const mockFindOneAndUpdate = vi.fn()
const mockFindOne = vi.fn()
const mockFind = vi.fn()
const mockToArray = vi.fn()
const mockInsertOne = vi.fn()
const mockUpdateOne = vi.fn()
const mockFindOneAndDelete = vi.fn()

const mockCollection = vi.fn((name: string) => ({
  findOneAndUpdate: mockFindOneAndUpdate,
  findOne: mockFindOne,
  find: mockFind,
  insertOne: mockInsertOne,
  updateOne: mockUpdateOne,
  findOneAndDelete: mockFindOneAndDelete,
}))

const mockDb = vi.fn(() => ({
  collection: mockCollection,
}))

class MockMongoClient {
  constructor(public uri: string) {}
  db = mockDb
}

vi.mock('mongodb', () => ({
  MongoClient: MockMongoClient,
}))

describe('db/links', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    process.env.MONGODB_URI = 'mongodb://localhost:27017'
    mockFind.mockReturnValue({ toArray: mockToArray })
  })

  afterEach(() => {
    delete process.env.MONGODB_URI
  })

  describe('resolveLink', () => {
    it('should find and update link with incremented refs', async () => {
      const { resolveLink } = await import('./links')
      const mockResult = { path: '/test', destination: 'https://example.com', stats: { refs: 1 } }
      mockFindOneAndUpdate.mockResolvedValue(mockResult)

      const result = await resolveLink('/test')

      expect(mockDb).toHaveBeenCalledWith('me')
      expect(mockCollection).toHaveBeenCalledWith('links')
      expect(mockFindOneAndUpdate).toHaveBeenCalledWith(
        { path: '/test' },
        { $inc: { 'stats.refs': 1 } }
      )
      expect(result).toEqual(mockResult)
    })

    it('should handle non-existent links', async () => {
      const { resolveLink } = await import('./links')
      mockFindOneAndUpdate.mockResolvedValue(null)

      const result = await resolveLink('/nonexistent')

      expect(result).toBeNull()
    })
  })

  describe('getLink', () => {
    it('should find link by filter', async () => {
      const { getLink } = await import('./links')
      const mockLink = { path: '/test', destination: 'https://example.com' }
      mockFindOne.mockResolvedValue(mockLink)

      const result = await getLink({ path: '/test' })

      expect(mockDb).toHaveBeenCalledWith('me')
      expect(mockCollection).toHaveBeenCalledWith('links')
      expect(mockFindOne).toHaveBeenCalledWith({ path: '/test' })
      expect(result).toEqual(mockLink)
    })

    it('should handle complex filters', async () => {
      const { getLink } = await import('./links')
      const filter = { destination: { $regex: 'example' } }
      mockFindOne.mockResolvedValue(null)

      await getLink(filter)

      expect(mockFindOne).toHaveBeenCalledWith(filter)
    })

    it('should return null for non-existent link', async () => {
      const { getLink } = await import('./links')
      mockFindOne.mockResolvedValue(null)

      const result = await getLink({ path: '/missing' })

      expect(result).toBeNull()
    })
  })

  describe('getLinks', () => {
    it('should return all links when no filter provided', async () => {
      const { getLinks } = await import('./links')
      const mockLinks = [
        { path: '/test1', destination: 'https://example1.com' },
        { path: '/test2', destination: 'https://example2.com' },
      ]
      mockToArray.mockResolvedValue(mockLinks)

      const result = await getLinks()

      expect(mockDb).toHaveBeenCalledWith('me')
      expect(mockCollection).toHaveBeenCalledWith('links')
      expect(mockFind).toHaveBeenCalledWith({})
      expect(result).toEqual(mockLinks)
    })

    it('should filter links by regex when pathRegex provided', async () => {
      const { getLinks } = await import('./links')
      const mockLinks = [{ path: '/blog/post1', destination: 'https://example.com' }]
      mockToArray.mockResolvedValue(mockLinks)

      const result = await getLinks('/blog')

      expect(mockFind).toHaveBeenCalledWith({ path: { $regex: '/blog' } })
      expect(result).toEqual(mockLinks)
    })

    it('should handle empty result set', async () => {
      const { getLinks } = await import('./links')
      mockToArray.mockResolvedValue([])

      const result = await getLinks()

      expect(result).toEqual([])
    })

    it('should handle null pathRegex explicitly', async () => {
      const { getLinks } = await import('./links')
      mockToArray.mockResolvedValue([])

      await getLinks(null)

      expect(mockFind).toHaveBeenCalledWith({})
    })
  })

  describe('addLink', () => {
    it('should insert new link with correct structure', async () => {
      const { addLink } = await import('./links')
      const mockResult = { insertedId: 'new-id' }
      mockInsertOne.mockResolvedValue(mockResult)

      // Mock Date.now() to have consistent timestamps
      const mockDate = new Date('2024-01-15T12:00:00Z')
      vi.setSystemTime(mockDate)

      const result = await addLink('/new', 'https://example.com')

      expect(mockDb).toHaveBeenCalledWith('me')
      expect(mockCollection).toHaveBeenCalledWith('links')
      expect(mockInsertOne).toHaveBeenCalledWith({
        path: '/new',
        destination: 'https://example.com',
        stats: { refs: 0 },
        createdAt: mockDate,
        updatedAt: mockDate,
      })
      expect(result).toEqual(mockResult)

      vi.useRealTimers()
    })

    it('should initialize refs counter to 0', async () => {
      const { addLink } = await import('./links')
      mockInsertOne.mockResolvedValue({ insertedId: 'id' })

      await addLink('/test', 'https://test.com')

      const insertCall = mockInsertOne.mock.calls[0][0]
      expect(insertCall.stats.refs).toBe(0)
    })
  })

  describe('updateLink', () => {
    it('should update link destination and timestamp', async () => {
      const { updateLink } = await import('./links')
      const mockResult = { modifiedCount: 1 }
      mockUpdateOne.mockResolvedValue(mockResult)

      const result = await updateLink('/test', 'https://new-destination.com')

      expect(mockDb).toHaveBeenCalledWith('me')
      expect(mockCollection).toHaveBeenCalledWith('links')
      expect(mockUpdateOne).toHaveBeenCalledWith(
        { path: '/test' },
        {
          $set: { destination: 'https://new-destination.com' },
          $currentDate: { updatedAt: true },
        }
      )
      expect(result).toEqual(mockResult)
    })

    it('should use $currentDate for updatedAt', async () => {
      const { updateLink } = await import('./links')
      mockUpdateOne.mockResolvedValue({ modifiedCount: 1 })

      await updateLink('/test', 'https://example.com')

      const updateCall = mockUpdateOne.mock.calls[0][1]
      expect(updateCall.$currentDate).toEqual({ updatedAt: true })
    })

    it('should handle non-existent link update', async () => {
      const { updateLink } = await import('./links')
      mockUpdateOne.mockResolvedValue({ modifiedCount: 0 })

      const result = await updateLink('/nonexistent', 'https://example.com')

      expect(result.modifiedCount).toBe(0)
    })
  })

  describe('deleteLink', () => {
    it('should delete link and archive it', async () => {
      const { deleteLink } = await import('./links')
      const mockLink = {
        path: '/test',
        destination: 'https://example.com',
        stats: { refs: 5 },
      }
      const mockArchiveResult = { insertedId: 'archive-id' }

      mockFindOneAndDelete.mockResolvedValue(mockLink)
      mockInsertOne.mockResolvedValue(mockArchiveResult)

      const mockDate = new Date('2024-01-15T12:00:00Z')
      vi.setSystemTime(mockDate)

      const result = await deleteLink('/test')

      expect(mockDb).toHaveBeenCalledWith('me')
      expect(mockCollection).toHaveBeenCalledWith('links')
      expect(mockFindOneAndDelete).toHaveBeenCalledWith({ path: '/test' })

      expect(mockCollection).toHaveBeenCalledWith('links-archive')
      expect(mockInsertOne).toHaveBeenCalledWith({
        ...mockLink,
        deletedAt: mockDate,
      })
      expect(result).toEqual(mockArchiveResult)

      vi.useRealTimers()
    })

    it('should preserve all original link data in archive', async () => {
      const { deleteLink } = await import('./links')
      const mockLink = {
        path: '/test',
        destination: 'https://example.com',
        stats: { refs: 10 },
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-10'),
        customField: 'custom value',
      }

      mockFindOneAndDelete.mockResolvedValue(mockLink)
      mockInsertOne.mockResolvedValue({ insertedId: 'archive-id' })

      await deleteLink('/test')

      const archiveCall = mockInsertOne.mock.calls[0][0]
      expect(archiveCall.path).toBe('/test')
      expect(archiveCall.destination).toBe('https://example.com')
      expect(archiveCall.stats.refs).toBe(10)
      expect(archiveCall.customField).toBe('custom value')
      expect(archiveCall.deletedAt).toBeDefined()
    })
  })

  describe('MongoDB connection', () => {
    it('should use correct database name', async () => {
      const { getLink } = await import('./links')

      mockFindOne.mockResolvedValue(null)
      await getLink({ path: '/test' })

      // Verify 'me' database was called
      expect(mockDb).toHaveBeenCalledWith('me')
    })

    it('should create MongoClient with connection string', async () => {
      // This test verifies that operations can be performed
      // (which means MongoClient was successfully created)
      const { getLink, addLink, updateLink } = await import('./links')

      mockFindOne.mockResolvedValue({ path: '/test' })
      mockInsertOne.mockResolvedValue({ insertedId: 'id' })
      mockUpdateOne.mockResolvedValue({ modifiedCount: 1 })

      await getLink({ path: '/test' })
      await addLink('/new', 'url')
      await updateLink('/test', 'newurl')

      // All operations should have accessed the database
      expect(mockDb).toHaveBeenCalled()
      expect(mockCollection).toHaveBeenCalled()
    })
  })

  describe('collection names', () => {
    it('should use "me" database for all operations', async () => {
      const { resolveLink, getLink, getLinks, addLink, updateLink, deleteLink } = await import('./links')

      mockFindOneAndUpdate.mockResolvedValue(null)
      mockFindOne.mockResolvedValue(null)
      mockToArray.mockResolvedValue([])
      mockInsertOne.mockResolvedValue({})
      mockUpdateOne.mockResolvedValue({})
      mockFindOneAndDelete.mockResolvedValue({})

      await resolveLink('/test')
      await getLink({ path: '/test' })
      await getLinks()
      await addLink('/test', 'url')
      await updateLink('/test', 'url')
      await deleteLink('/test')

      // All calls should use 'me' database
      const dbCalls = mockDb.mock.calls
      expect(dbCalls.every(call => call[0] === 'me')).toBe(true)
    })

    it('should use "links" collection for CRUD operations', async () => {
      const { resolveLink, getLink, getLinks, addLink, updateLink } = await import('./links')

      mockFindOneAndUpdate.mockResolvedValue(null)
      mockFindOne.mockResolvedValue(null)
      mockToArray.mockResolvedValue([])
      mockInsertOne.mockResolvedValue({})
      mockUpdateOne.mockResolvedValue({})

      await resolveLink('/test')
      await getLink({ path: '/test' })
      await getLinks()
      await addLink('/test', 'url')
      await updateLink('/test', 'url')

      // Check that 'links' collection was called
      expect(mockCollection).toHaveBeenCalledWith('links')
    })

    it('should use "links-archive" collection for deleted links', async () => {
      const { deleteLink } = await import('./links')

      mockFindOneAndDelete.mockResolvedValue({ path: '/test' })
      mockInsertOne.mockResolvedValue({})

      await deleteLink('/test')

      expect(mockCollection).toHaveBeenCalledWith('links-archive')
    })
  })
})
