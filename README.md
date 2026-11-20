# TruyenQQ Reader

Live reading UI fetching TruyenQQ HTML through a Vercel Function. Chapter images keep their original source-host URLs and are not downloaded into this repository.

## Local development

Run `npx vercel dev`.

## Deploy

Import this repository into Vercel or run `npx vercel --prod`. Static frontend files live at the repository root; `/api/source` is restricted to `truyenqq.com.vn`.

The source site may change its HTML or restrict automated access; update the parser in `app.js` if needed.
