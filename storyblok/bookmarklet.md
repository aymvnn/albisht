# "Republish ALBISHT" — instant publish for the brand owner

The free Storyblok plan has **no webhooks**, so a publish in Storyblok does not
automatically tell the website to refresh. Two things keep the site current:

1. **Automatic (no action):** every page re-fetches from Storyblok at most every
   **15 minutes** (time-based ISR). Publish and walk away — it appears within 15 min.
2. **Instant (one click):** the **Republish ALBISHT** bookmarklet below refreshes
   every page in a few seconds, no rebuild.

## Option A — Revalidate bookmarklet (recommended, instant, no rebuild)

Hits the site's `/api/revalidate` endpoint. Fastest and free.

1. Set `STORYBLOK_REVALIDATE_SECRET` in the site's environment (see `.env.local.example`).
2. Make a new browser bookmark named **Republish ALBISHT** with this URL
   (replace `SECRET` with the value you set):

```
javascript:(function(){window.open('https://albisht.qa/api/revalidate?secret=SECRET','_blank');})();
```

3. After **Save & publish** in Storyblok, click the bookmark. A tab opens showing
   `{"revalidated":true}`. The live site reflects the change within seconds.

> During build/preview the domain is the Vercel preview URL — swap
> `https://albisht.qa` for that host in the bookmark while testing.

## Option B — Full redeploy bookmarklet (Vercel Deploy Hook)

Triggers a complete rebuild. Slower (~1–2 min) but regenerates everything,
including newly added Journal/Celebration entries that affect static params.

1. In Vercel → Project → Settings → Git → **Deploy Hooks**, create a hook
   (e.g. "Storyblok publish") on the production branch. Copy its URL.
2. Bookmark named **Rebuild ALBISHT**:

```
javascript:(function(){fetch('PASTE_DEPLOY_HOOK_URL',{method:'POST',mode:'no-cors'});alert('ALBISHT rebuild started — live in ~2 min.');})();
```

## Which to use when

| Situation | Use |
| --- | --- |
| Edited existing text, prices, photos | **Option A** (instant) |
| Added/removed a Journal post or Celebration | **Option B** (regenerates routes) |
| Did nothing, not in a hurry | Wait 15 min (automatic) |
