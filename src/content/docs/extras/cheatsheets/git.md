# Git Cheat Sheet

Grouped by how often you'll actually reach for each command, not by Git's internal categories. The first section covers 90% of a normal day, everything after it you'll reach for occasionally, know it exists, look up the exact flag when you need it.

## The Commands You'll Type Constantly

```bash
git status                  # what's changed, what's staged, what's untracked
git add file.txt            # stage one file
git add .                   # stage everything changed
git commit -m "message"     # commit what's staged
git push                    # send commits to the remote
git pull                    # bring the remote's commits into your local branch
git switch feature          # move to an existing branch
git switch -c feature       # create a new branch and move to it
git log --oneline --graph   # compact history with a branch graph
```

> [!TIP]
> If you only memorize six commands, memorize these. Everything else on this page is a variation or an edge case built on top of this list.

## First-Time Setup

Run once per machine, not per repository.

| Command | What it does |
|---|---|
| `git config --global user.name "Ada"` | Set your commit name |
| `git config --global user.email you@x.com` | Set your commit email |
| `git config --global init.defaultBranch main` | Name new repos' first branch `main` |
| `git config --global core.editor "code --wait"` | Set your default editor |
| `git config --list` | Show all current config |
| `git --version` | Print the installed Git version |

## Getting a Repository

| Command | What it does |
|---|---|
| `git init` | Turn the current folder into a new repo |
| `git clone <url>` | Copy a remote repo locally |
| `git clone <url> mydir` | Clone into a specifically named folder |
| `git clone --depth 1 <url>` | Shallow clone, latest commit only, faster for large repos |
| `git clone -b dev <url>` | Clone and immediately check out the `dev` branch |

## Branching and Combining Work

This is where most confusion actually lives, so a bit more explanation than a bare table.

| Command | What it does |
|---|---|
| `git branch` | List local branches |
| `git branch feature` | Create a branch without switching to it |
| `git branch -d feature` | Delete a branch that's already merged |
| `git branch -m newname` | Rename the current branch |
| `git merge feature` | Merge `feature` into your current branch |
| `git merge --no-ff feature` | Force a merge commit even if it could fast-forward |
| `git rebase main` | Replay your current branch's commits on top of `main` |
| `git rebase -i HEAD~3` | Interactively edit your last 3 commits |
| `git rebase --continue` | Resume a rebase after fixing a conflict |
| `git rebase --abort` | Cancel a rebase entirely, back to where you started |
| `git cherry-pick <hash>` | Pull one specific commit onto your current branch |

> [!WARNING]
> Rebase rewrites commit hashes. Fine on a branch only you're working on. Never rebase a branch someone else has already pulled, it breaks their history and causes a mess of duplicate-looking commits for everyone.

## Talking to a Remote

| Command | What it does |
|---|---|
| `git remote -v` | List the remotes this repo knows about |
| `git remote add origin <url>` | Link a remote named `origin` |
| `git fetch` | Download the remote's commits, don't touch your working files |
| `git pull` | `fetch` + `merge` in one step |
| `git push -u origin main` | Push and remember this as the default upstream |
| `git push origin --delete feature` | Delete a branch on the remote |

> [!TIP]
> `fetch` is the safe one, it never changes anything you're currently working on. `pull` merges immediately. If you want to look before merging, `fetch` then `git log main..origin/main` to see what's incoming.

## When Something Goes Wrong

| Command | What it does | How risky |
|---|---|---|
| `git restore file.txt` | Throw away unstaged changes to one file | Low, undoable via editor undo if caught fast |
| `git restore --staged file.txt` | Unstage a file, keeps the actual changes | None |
| `git stash` | Shelve everything, come back to a clean working directory | None, `git stash pop` brings it back |
| `git commit --amend` | Fix the message or contents of the last commit | Low, unless already pushed and shared |
| `git reset --soft HEAD~1` | Undo the last commit, keep the changes staged | Low |
| `git revert <hash>` | Add a new commit that undoes an old one | None, safe on shared history |
| `git reset --hard HEAD~1` | Undo the last commit and delete the changes | **High, unrecoverable** |

> [!IMPORTANT]
> `reset --hard` is the one command on this page with no built-in undo. If you're not certain, `stash` or `revert` instead, both are reversible.

## Digging Through History

| Command | What it does |
|---|---|
| `git log` | Full commit history |
| `git diff` | Unstaged changes vs the last commit |
| `git diff --staged` | Staged changes vs the last commit |
| `git show <hash>` | Everything one specific commit changed |
| `git blame file.txt` | Who last touched each line, and in which commit |

---
*Back to [Cheatsheets](./README.md)*