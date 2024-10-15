[weather.family](https://weather.family) is a privacy-minded social network server run and customized by Zander.

## Highlights

- 🐘 weather.family uses Mastodon, a social media platform for posting updates and photos among family and family friends.
- 🚫 No ads, no tracking, no content algorithms, no one selling your data, no AIs training on your photos, etc.
- 🔒 By default, your posts will only appear to others who also have accounts on weather.family (unless you change settings).
- 📫 That's the gist. Now you just need an invite link!

## What apps can I use on my phone?

There are many apps you can use with weather.family and Mastodon. Here are a few.

iOS:
- Mastodon (official app)
- Tusker
- Ice Cubes
- Ivory

Android:
- Mastodon (official app)
- Moshidon (which I use)
- Tusky

Worst case, there's always the website on your phone's browser.

> In most apps, posts you create will appear as "Public" by default. Don't worry--unless you explicitly change settings, "Public" is only _public_ among users of weather.family. See the section on post visibility below.

## Why was this created?

We wanted a private place to share content that's more flexible than a group chat. As a bonus, you can optionally follow others across Mastodon (and the Fediverse).

## What is Mastodon?

Mastodon is a free, [open-source](https://opensource.com/resources/what-open-source) social media platform that's owned by no one. Similar to how email works, Mastodon is _decentralized_: anyone can run a server and connect to the larger network.

## What is a server?

A server is loosely defined as a place where code runs. Every website comes from a server. It takes money to operate servers and time to keep them up to date with important security patches.

## About reply visibility

First, let's discuss reply visibility. Replies default to the visibility of the post they're replying to, though you can restrict the reply visibility manually.

That means if you reply to a public, federated (non-local-only) post (which means most posts from other Mastodon servers), your reply will be public and federated by default. You may want to change your reply's visibility before posting.

> ❗ You can add :local_only: (including the colons) to any post or reply to make sure it is local-only, even from apps which don't display local-only as an option.  ([ref](https://github.com/hometown-fork/hometown/wiki/Local-only-posting#the-local_only-emoji))

## About post visibility

On the website, you'll see a broken chain icon at the bottom of a post if it's local-only. This post is Public but Local-only, so it's only public to users of weather.family.

![Screen clip with public post and broken chain icon](/local-only-toot.png)

You may not see local-only options in some Mastodon apps, but new posts on weather.family will still use the default setting.

Currently, there are two sets of options for post visibility. The first is under the lock icon. These are standard [Mastodon options](https://docs.joinmastodon.org/user/posting/#privacy).

![Screen clipping with "Public", "Unlisted", "Followers only", "Mentioned people only"](/followers-only.png)

The default is currently "Public". You may prefer "Followers only" and you can make that your default in your account settings. "Mentioned people only" functions as Mastodon's equivalent of direct messages (DMs).

The second set of options is under the chain link icon. These come from a flavor of Mastodon we use called Hometown. **In short, Local-only posts are _not_ federated**--meaning they won't be shared to other servers. More [here](https://github.com/hometown-fork/hometown/wiki/Local-only-posting).

![Screen clipping with "Federated" and "Local-only" post options.](/local-only.png)

The use of "Public" and "Local-only" together restricts the post to users logged into a weather.family account.

> ❗ You can add :local_only: (including the colons) to any post or reply to make sure it is local-only, even from apps which don't display local-only as an option. ([ref](https://github.com/hometown-fork/hometown/wiki/Local-only-posting#the-local_only-emoji))

## How can I be sure my posts are local-only from a standard Mastodon app?

The screenshots above show how the website displays posts, but most Mastodon apps won't show the local-only option or which posts are local-only.

## What is the Fediverse?

Imagine if you could comment on a YouTube video from your Instagram account, or tweet a comment on a Facebook account.

Well, that's never going to happen, but the Fediverse is kind of like that.

Mastodon can play nicely with other apps like [PixelFed](https://pixelfed.org/) (think decentralized Instagram), [PeerTube](https://joinpeertube.org/) (think decentralized YouTube), and many other apps. Broadly, this network is called the [Fediverse](https://en.wikipedia.org/wiki/Fediverse).

## HALP. I have so many more questions!

Well, you can try [this guide](http://guidetomastodon.com), which is much more extensive. But be aware it doesn't cover local-only posts.

---
See the source code on [GitHub](https://github.com/steamwings/weather.family).
