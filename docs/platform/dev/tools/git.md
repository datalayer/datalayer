---
title: Git
---

# Git

> [Git](https://git-scm.com) is a free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency.

```bash
git config --global user.name "Eric Charles"
git config --global user.email eric@datalayer.io
```

mkdir datalayer
cd datalayer
git init
touch README
git add README
git commit -m 'first commit'
git remote add origin git@github.com:echarles/datalayer.git
git push origin master

Careful: git reset --hard WILL DELETE YOUR WORKING DIRECTORY CHANGES
Assuming you are sitting on that commit, then this command will wack it...
git reset --hard HEAD~1
The HEAD~1 means the commit before head.
Or, you could look at the output of git log, find the commit id of the commit you want to back up to, and then do this:
git reset --hard sha1-commit-id

git clone git://...
git clone --depth 1 git://...

git fetch remote branch: You need to create a local branch that tracks a remote branch.
The following command will create a local branch named daves_branch, tracking the remote branch origin/daves_branch. When you push your changes the remote branch will be updated.
git checkout --track origin/daves_branch
OR us fetch followed by checkout ...
git fetch remote rbranch:lbranch
git checkout lbranch
... where rbranch is the remote branch or source ref and lbranch is the as yet non-existent local branch or destination ref you want to track and which you probably want to name the same as the remote branch or source ref. This is explained under options in the explanation of refspec.

Fetching a remote
When working with other people's repositories, there are four basic Git commands you will need:
  git clone
  git fetch
  git merge
  git pull
These commands all act on a repository's remote URL.
Clone
To grab a complete copy of another user's repository, you will use git clone, like this:
git clone https://github.com/user/repo.git

## Clone a repository to your computer

When you run git clone, the following actions occur:
  A new folder called repo is made
  It is initialized as a Git repository
  All of the repository's files are downloaded there
  git clone checks out the default branch (usually called master)
  git clone creates a remote named origin, pointing to the URL you cloned from
You can choose from several different URLs when cloning a repository. While logged in to GitHub, these URLs are available in the sidebar:
Remote url list
Fetch
Fetching from a repository grabs all the new branches and tags without copying those changes into your repository. You'd use git fetch to look for updates made by other people.
If you already have a local repository with a remote URL set up for the desired project, you can grab all the new information by using git fetch emremotename/em in the terminal:
git fetch remotename

## Fetches updates made to an online repository

Otherwise, you can always add a new remote.
Merge
Merging combines your local changes with changes made by others.
Typically, you'd merge a branch on your online repository with your local branch:
git merge remotename/branchname

## Merges updates made online with your local work

Pull
git pull is a convenient shortcut for completing both git fetch and git mergein the same command:
git pull remotename/branchname

## Grabs online updates and merges them with your local work

Because pull performs a merge on the retrieved changes, you should ensure that your local work is committed before running the pull command. If you run into a merge conflict you cannot resolve, or if you decide to quit the merge, you can use git merge --abort to take the branch back to where it was in before you pulled.

git pull upstream branch

git checkout -b branch-name
git checkout branch-name = git branch branch-name; git checkout branch-name; git pull origin branch-name
git checkout -b branch-name origin/branch-name
git checkout master
git merge branch-name
git branch -a
git branch -m old_branch new_branch
git branch -D branch-name
git push origin :branch #delete remote branch in origin
git push origin --delete branch-name

git log -- [filename]
gitk [filename]

git fetch --tag
git log -p filename
git checkout -b tag_name tag_name

Before you can start working locally on a remote branch, you need to fetch it as called out in answers below.
To fetch a branch, you simply need to:
git fetch origin
This will fetch all of the remote branches for you. You can see the branches available for checkout with:
git branch -v -a
With the remote branches in hand, you now need to check out the branch you are interested in, giving you a local working copy:
git checkout -b test origin/test
EDIT - The answer below actually improves on this. On Git=1.6.6 you can just do:
git fetch
git checkout test

git fetch upstream
git checkout master
git reset --hard upstream/master  
git push origin master --force
f
git fetch
git checkout -b branch_name branch_name
git branch --set-upstream-to=upstream/branch_name branch_name
Given a branch foo and a remote upstream:
As of Git 1.8.0:
git branch -u upstream/foo
Or, if local branch foo is not the current branch:
git branch -u upstream/foo foo
Or, if you like to type longer commands, these are equivalent to the above two:
git branch --set-upstream-to=upstream/foo
git branch --set-upstream-to=upstream/foo foo
As of Git 1.7.0:
git branch --set-upstream foo upstream/foo
Notes:All of the above commands will cause local branch foo to track remote branch foo from remote upstream. The old (1.7.x) syntax is deprecated in favor of the new (1.8+) syntax. The new syntax is intended to be more intuitive and easier to remember.

git show af60e1012d9d3f41bef1db62aff3ab49c040e2fb

git checkout sha
git checkout sha file/to/restore
git checkout sha~1 file/to/restore

git remote add origin git@github.com:echarles/datalayer.git
git push origin master

git remote add upstream git://...
git fetch upstream
git merge upstream master
# if fatal: 'upstream' does not point to a commit  git pull upstream master
git push origin master

git merge upstream/master ?

mkdir test
git init --bare
git remote rm origin
git remote add origin git@aos.be:test
git push origin master
git remote show origin
git diff --no-prefix --staged

git diff master..branch

git squash
git cherry-pick

git whatchanged
git log --name-status
git log --name-only
git log --stat

git show sha
git diff sha^ sha

git reset HEAD .
git reset HEAD^ .

git revert master~3..master

If you want to retrieve a file in your history and if you know the path the file was at, you can do this:
git log -- /path/to/file
This should show a list of commits which touched that file. Then, you can find the version of the file you want, and display it with...
git show SHA -- /path/to/file
(or restore it into your working copy with git checkout SHA -- /path/to/file)
--
GIT COMPLETION
--
https://github.com/git/git/tree/master/contrib/completion

Git Auto Completion: Execute the following in your terminal:
cd ~
curl https://github.com/git/git/raw/master/contrib/completion/git-completion.bash -OL
vim .bash_profile
# add the following line:
source ~/git-completion.bash
# go back to terminal and execute:
source .bash_profile
Now, hitting tab will autocomplete your git commands, including branch names, e.g.:
git checkout TAB
shows you the available branches and tags
git checkout fix-2TAB
completes it to
git checkout fix-29237810012

## Git Client

git on linux

+ gitg
+ giggle
+ gitk
+ git-cola

## Create your Git Server

http://tumblr.intranation.com/post/766290565/how-set-up-your-own-private-git-server-linux

How to set up your own private Git server on Linux

Update 2: as pointed out by Tim Huegdon, several comments on a Hacker News thread pointing here, and the excellent Pro Git book, Gitolite seems to be a better solution for multi-user hosted Git than Gitosis. I particularly like the branch–level permissions aspect, and what that means for business teams. I’ve left the original article intact.
Update: the ever–vigilant Mike West has pointed out that my instructions for permissions and git checkout were slightly askew. These errors have been rectified.
One of the things I’m attempting to achieve this year is simplifying my life somewhat. Given how much of my life revolves around technology, a large part of this will be consolidating the various services I consume (and often pay for). The mention of payment is important, as up until now I’ve been paying the awesome GitHub for their basic plan.
I don’t have many private repositories with them, and all of them are strictly private code (this blog; Amanda’s blog templates and styles; and some other bits) which don’t require collaborators. For this reason, paying money to GitHub (awesome though they may be) seemed wasteful.
So I decided to move all my private repositories to my own server. This is how I did it.
Set up the server
These instructions were performed on a Debian 5 “Lenny” box, so assume them to be the same on Ubuntu. Substitute the package installation commands as required if you’re on an alternative distribution.
First, if you haven’t done so already, add your public key to the server:
ssh myuser@server.com mkdir .ssh
scp ~/.ssh/id_rsa.pub myuser@server.com:.ssh/authorized_keys
Now we can SSH into our server and install Git:
ssh myserver.com
sudo apt update
sudo apt install git-core
…and that’s it.
Adding a user
If you intend to share these repositories with any collaborators, at this point you’ll either:
    Want to install something like Gitosis (outside the scope of this article, but this is a good, if old, tutorial); or
    Add a “shared” Git user.
We’ll be following the latter option. So, add a Git user:
sudo adduser git
Now you’ll need to add your public key to the Git user’s authorized_keys:
sudo mkdir /home/git/.ssh
sudo cp ~/.ssh/authorized_keys /home/git/.ssh/
sudo chown -R git:git /home/git/.ssh
sudo chmod 700 !$
sudo chmod 600 /home/git/.ssh/*
Now you’ll be able to authenticate as the Git user via SSH. Test it out:
ssh git@myserver.com
Add your repositories
If you were to not share the repositories, and just wanted to access them for yourself (like I did, since I have no collaborators), you’d do the following as yourself. Otherwise, do it as the Git user we added above.
If using the Git user, log in as them:
login git
Now we can create our repositories:
mkdir myrepo.git
cd !$
git --bare init
The last steps creates an empty repository. We’re assuming you already have a local repository that you just want to push to a remote server.
Repeat that last step for each remote Git repository you want.
Log out of the server as the remaining operations will be completed on your local machine.
Configure your development machine
First, we add the remotes to your local machine. If you’ve already defined a remote named origin (for example, if you followed GitHub’s instructions), you’ll want to delete the remote first:
git remote rm origin
Now we can add our new remote:
git remote add origin git@server.com:myrepo.git
git push origin master
And that’s it. You’ll probably also want to make sure you add a default merge and remote:
git config branch.master.remote origin && git config branch.master.merge refs/heads/master
And that’s all. Now you can push/pull from origin as much as you like, and it’ll be stored remotely on your own myserver.com remote repository.
Bonus points: Make SSH more secure
This has been extensively covered by the excellent Slicehost tutorial, but just to recap:
Edit the SSH config:
sudo vi /etc/ssh/sshd_config
And change the following values:
Port 2207
...
PermitRootLogin no
...
AllowUsers myuser git
...
PasswordAuthentication no
Where 2207 is a port of your choosing. Make sure to add this so your Git remote:
git remote add origin ssh://git@myserver.com:2207/~/myrepo.git

## Show Ignored Files

git ls-files --others -i --exclude-standard
