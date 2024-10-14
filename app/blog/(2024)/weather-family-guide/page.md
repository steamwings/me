[weather.family](https://weather.family) is a Mastodon server run by Zander, created mainly as a place to post updates and photos among family and friends.

## Highlights

- weather.family is a place to stay up to date with family and friends.
- Your account is configured for privacy **by default**. Your posts will only appear to your followers who also have accounts on weather.family unless you explicitly change settings.
- No ads, no tracking, no content algorithms, no one selling your data, no AIs training on your photos, etc.
- That's the gist. Now just ask for an invite link!

## Why was this created?

Mainly, we wanted a private place to share content that's a little more flexible than a group chat. As a bonus, you can optionally follow others across Mastodon.

## What is Mastodon?

Mastodon is a free, [open-source](https://opensource.com/resources/what-open-source), decentralized social media platform. Similar to how email works, anyone can run a server and connect to the larger network.

## What does decentralized mean?

Decentralized means that no single company or entity controls or owns everything. Instead, many servers run by different people all communicate with each other.

## What is a server?

A server is loosely defined as a place where code runs. Every website comes from a server. It takes money to operate servers and time to keep them up to date with important security patches.

## Understanding post visibility

There are quite a few post visibility options on weather.family. If you're confused, just use the defaults. If you're curious, read on.

Currently, there are two sets of options for post visibility. The first is under the lock icon. These are standard [Mastodon options](https://docs.joinmastodon.org/user/posting/#privacy).

![Screen clipping with "Public", "Unlisted", "Followers only", "Mentioned people only"](/followers-only.png)

The second set of options is under the chain link icon. These come from a flavor of Mastodon we use called Hometown. **In short, Local-only posts are _not_ federated**--meaning they won't be distributed to other servers. More [here](https://github.com/hometown-fork/hometown/wiki/Local-only-posting).

![Screen clipping with "Federated" and "Local-only" post options.](/local-only.png)

The use of "Followers only" and "Local-only" together is intended to  ensure that to see a post, someone must (1) be your follower and (2) be logged into a weather.family account. The combination of "Public" and "Local-only" may still be visible to people who are not logged in to weather.family.

## What is the Fediverse?

Mastodon can integrate with other apps like [PixelFed](https://pixelfed.org/) (think decentralized Instagram), [PeerTube](https://joinpeertube.org/) (think decentralized YouTube), and many other apps. Broadly, this network is called the [Fediverse](https://en.wikipedia.org/wiki/Fediverse).

---
See the source code on [GitHub](https://github.com/steamwings/weather.family).
