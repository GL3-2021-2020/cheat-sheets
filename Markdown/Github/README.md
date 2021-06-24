# Git&Github-Cheat-Sheet-for-Beginners


## 1. Make sure you have GIT installed in your PC 
##### `$ git --version` 
##### Or you can install it from this Link: `https://git-scm.com/downloads`
      


## 2. Most used Commands
 
   #### Create & Synchronize modifications 
| Command | Description |
| --- | --- |
| git init | Create a local repository|
| git clone | Copying an exisiting repository to your local desktop  |
| git add | Adding changed and new files to the staging area to be committed |
| git commit <br /> git commit -a | Taking a snapshot of the current state of the project <br /> Commit by skipping the staging area |
| git pull | fetching updates from the remote repo to your local one |
| git push | Pushing commits from your local repository to your remote one |

#### Track
| Command | Description |
| --- | --- |
| git status | Show the working tree status|
| git log| Listing commits made in the current Git repository |
| git show | Displaying informations about commit according to its ID   |

#### Undo & Rollbacks
| Command | Description |
| --- | --- |
|git checkout|Discarding changes of an unstaged file |
|git commit --amend|Modifying the latest commit |
|git reset | Unstaging modifications|
|git revert | Creating a new commit that undo the changes from a previous commit |

#### Branches
| Command | Description |
| --- | --- |
|git branch | Listing exsiting branches in the project|
|git branch \<branchName\>  | Creating new branch|
|git checkout \<branchName\>  | Switching to a different branch|
|git checkout -b \<branchName\> |Creating a new branch and switching to it|
|git branch -d \<branchName\>  | Delete branch |
|git merge \<branchName\> |Adding branch's modifications to the current branch|

      

## 3. Your first repository


   - Configuration 
   
        - ```
            $ git config --global user.name "githubUsername"
            $ git config --global user.email "Foulen@Domaine.com"
          ```
      
   - Create New Repository in github 
       - ![alt text](https://github.com/rihemebh/Github-Cheat-Sheet-for-Beginners/blob/main/pictures/newrepo0.png)
         ![](https://github.com/rihemebh/Github-Cheat-Sheet-for-Beginners/blob/main/pictures/create%20repo.PNG)
   - Clone the Repository in your Local machine 
      - `
            $ git clone https://github.com/userName/RepoName.git
        `
   - Open the folder and start your project
   - Add changes to the staging Area
      - ` $ git add . `
   - Commit changes 
      - ` $ git commit -m "commit message" `
   - Push changes to remote 
      - ` $ git push `
