# Faisal's personal website: publish it on GitHub Pages

Follow these instructions on a computer, using GitHub's website. You do not need Git, a terminal, Node.js, Python, or a paid hosting service for publication. The supplied HTML, CSS, and JavaScript are ready to upload.

## 1. Sign in to your own GitHub account

Open [github.com](https://github.com/) and sign in, or create an account and verify your email. Use Faisal's account, because the website will be associated with its username.

Find your **username** in your GitHub profile URL: `https://github.com/fai-099`. For these instructions, your username is `fai-099`.

## 2. Open the existing repository

The account is **fai-099** and the repository is **fai-099**:

- Repository: https://github.com/fai-099/fai-099
- Website: https://fai-099.github.io/fai-099/
- Publishing branch: `main`
- Publishing folder: `/(root)`

Keep the existing repository name. Because this is a project site, the website URL includes `/fai-099/`. The code uses relative asset paths and supports this URL.

## 3. Extract the ZIP on your computer

Download the ZIP your brother shares and extract it completely. On Windows, right-click the ZIP and choose **Extract All**. On macOS, double-click the ZIP.

Open the extracted folder. Find the level containing **index.html**, **assets**, and **docs** together. That is the website's top level.

The shareable ZIP contains:

```text
index.html
.nojekyll
README.md                  ← these instructions
assets/
    style.css
    app.js
    profile.js
    favicon.svg
    ASSET_SOURCES.md
    fonts/
    logos/
docs/
    cv_SOHAILfaisal.pdf
    photo.jpeg
```

Keep the folders and filenames exactly as supplied. The `docs` folder contains the CV and photo; the `assets` folder contains the design, interactions, fonts, and logos.

## 4. Upload the extracted website

1. Open https://github.com/fai-099/fai-099 on GitHub and open its **Code** tab.
2. Click **Add file → Upload files** above the file list.
3. In your computer's file manager, open the extracted website folder.
4. Select its **contents**: `index.html`, `assets`, `docs`, `README.md`, and `.nojekyll` if visible. Drag that selection into GitHub's upload area. Dragging the `assets` and `docs` folders preserves their internal paths.
5. Wait for the uploads to finish. Check that paths include `index.html`, `assets/style.css`, and `docs/photo.jpeg` without an extra enclosing folder before them.
6. Enter the commit message `Add my personal academic website`.
7. Select **Commit directly to the main branch** and click **Commit changes**. This intentionally replaces the initial generated README with this guide. If GitHub presents a proposal instead, finish the pull request and merge it into the default branch before continuing.

GitHub documents browser uploads in [Adding files](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository).

**Upload the extracted contents, not the ZIP itself.** If you drag the enclosing folder instead, the homepage can end up one directory too deep. Do not flatten the `assets` or `docs` folders.

The `.nojekyll` file may be hidden on your computer. If it did not upload, use **Add file → Create new file**, name it exactly `.nojekyll`, enter `Static HTML website; no Jekyll processing required.`, and commit it. This marker's contents are not used by the website.

At the repository's **Code** tab, `index.html`, `assets`, and `docs` should now appear directly in the main file list.

## 5. Enable GitHub Pages

In the repository, open **Settings → Pages**. Under **Build and deployment**, set:

| Setting | Value |
| --- | --- |
| Source | **Deploy from a branch** |
| Branch | **main** |
| Folder | **/(root)** |

If your default branch has a different name, select the branch that contains the uploaded `index.html`. Click **Save**. These options are documented in [GitHub's publishing-source guide](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

For this website, select **/(root)**. The `/docs` option would point to the CV/photo folder. No custom build workflow, Jekyll theme, `_config.yml`, custom domain, or package installation is needed.

## 6. Open your published website

Return to **Settings → Pages** and open the website URL shown there. For this repository, it is `https://fai-099.github.io/fai-099/`.

Publishing can take up to 10 minutes after a change, according to [GitHub's quickstart](https://docs.github.com/en/pages/quickstart). The repository's **Actions** tab shows deployment progress. If a run fails, open it and read the failed step.

Use the public website URL when sharing your page. The `github.com/...` address is the repository, and `127.0.0.1` is only a local preview address.

Check the page on a computer and a phone. Try the CV download, LinkedIn link, publication filters, paper links, and mobile menu. The GitHub button links to https://github.com/fai-099. Google Scholar remains a placeholder until you add its URL.

## 7. Add your Google Scholar profile

In the repository's **Code** tab, open `assets/profile.js`, click the pencil/edit button, and replace only the empty strings:

```javascript
window.FAISAL_PROFILE = {
  linkedin: 'https://www.linkedin.com/in/muhammad-faisal-sohail-1b90061ab/',
  github: 'https://github.com/fai-099',
  scholar: '', // Leave blank until you have your Google Scholar profile URL.
};
```

For Scholar, open your own profile and copy its complete HTTPS address, including the `user=` identifier. Paste that address between the quotes on the `scholar` line. Leave `scholar: ''` if your profile is not ready. Keep the quotes, commas, and braces intact.

Commit the edit to the publishing branch. The buttons activate automatically once their valid HTTPS URLs are saved. You do not need to change the HTML or rerun a build.

## 8. Make later updates

| Change | File to edit or replace |
| --- | --- |
| Biography, education, teaching, projects | `index.html` |
| Profile URLs | `assets/profile.js` |
| Publications | The `publications` list near the top of `assets/app.js` |
| CV | `docs/cv_SOHAILfaisal.pdf` |
| Portrait | `docs/photo.jpeg` |
| Fonts, colors, spacing | `assets/style.css` |

To replace the CV, enter the repository's `docs` folder and use **Add file → Upload files** to upload the replacement with exactly the same filename. Commit it. Replace the portrait the same way. Keep a local copy of your edits for future updates.

Changes committed to the publishing branch trigger publication automatically; see [GitHub's publishing-source guide](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## If something does not look right

| Symptom | What to check |
| --- | --- |
| The site shows 404 | Wait for deployment, then check the selected branch, `/(root)`, and root-level `index.html`. |
| Only README text appears | The uploaded `index.html` may be missing or inside an extra enclosing folder. |
| Text appears without styling | Confirm `assets/style.css`, `assets/fonts/`, and the rest of `assets` were uploaded with their original paths. |
| CV or portrait is missing | Confirm both files are inside `docs` with the exact filenames shown above. |
| An old design remains | Wait for deployment to finish, then hard-refresh the browser or check in a private window. |
| A profile still says “Link coming soon” | Confirm `assets/profile.js` contains the full HTTPS URL, with valid JavaScript punctuation. |
| No branch is listed in Pages | Finish committing the uploaded files, then reopen Pages settings. |

Instructions checked against GitHub's official documentation on 9 November 2026. This guide is included in the ZIP as `README.md`.
