<p align="center">
<img src="https://user-images.githubusercontent.com/73957024/230713858-93e729bb-0f7e-4056-9ae9-e5249d6be9c7.png" alt="Logo" width="700">
</p>
</br>


<!-- PROJECT LOGO -->
<p align="center">
  <h1 align="center">PlagiCheck 📑</h1>

   <p align="center">
     One stop solution for Plagiarism Detection
    <br />
    <a href="https://github.com/prasoonsoni/PlagiCheck"><strong>Explore the docs »</strong></a> 
    <br />
    •
    <a href="https://github.com/prasoonsoni/PlagiCheck/issues">Report Bug</a> 
    •
    <a href="https://github.com/prasoonsoni/PlagiCheck/issues">Request Feature</a> 
    •
  </p>
</p>

<!-- BADGES -->
<p align="center">
  <a href="https://github.com/prasoonsoni/PlagiCheck/graphs/contributors">
    <img src="https://img.shields.io/github/contributors/prasoonsoni/PlagiCheck.svg?style=for-the-badge">
  </a>
  <a href="https://github.com/prasoonsoni/PlagiCheck/network/members">
    <img src="https://img.shields.io/github/forks/prasoonsoni/PlagiCheck?style=for-the-badge">
  </a>  
  <a href="https://github.com/prasoonsoni/PlagiCheck/stargazers">
    <img src="https://img.shields.io/github/stars/prasoonsoni/PlagiCheck?style=for-the-badge">
  </a>
  <a href="https://github.com/prasoonsoni/PlagiCheck/issues">
    <img src="https://img.shields.io/github/issues/prasoonsoni/PlagiCheck?style=for-the-badge">
  </a>
</p>



## 🤔 What it does ?
A multi-level plagiarism tool that can be used to detect plagiarism in research papers. The tool has been developed to address the issue of the rising instances of plagiarism among students, who submit plagiarized papers for credit without any clear data on how much has been plagiarized. The proposed approach uses the Analytic Hierarchy Process (AHP) technique, which comprises three levels of plagiarism detection: level-0, level-1, and level-2.

In level-0, the tool uses the Google dorking technique to search for potential plagiarized papers available on the internet. If a paper is found to be plagiarized beyond a set threshold value, it is rejected and does not proceed to level-1. 

In level-1, the tool checks for plagiarism in the introduction, abstract, and references of the paper. Advanced text comparison algorithms are used to compare the submitted paper with existing papers in the database and generate a plagiarism report that highlights any similarities found.

In level-2, the tool performs a full paper plagiarism check to provide comprehensive detection results. Advanced algorithms are used to scan the entire paper for plagiarism and generate a detailed report that highlights any similarities found. The multi-level approach is aimed at providing an accurate and efficient plagiarism detection system that can identify even the most sophisticated forms of plagiarism, such as when text is heavily reworded or when original text is replaced with similar text using foreign characters.
## ⚒️ Technologies used ?

* NodeJS, ExpressJS, MongoDB, FastAPI

## 🧪Test the APIs 
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/17342551-91ef93d2-fe5d-4ffa-90d0-136ac36b5d16?action=collection%2Ffork&collection-url=entityId%3D17342551-91ef93d2-fe5d-4ffa-90d0-136ac36b5d16%26entityType%3Dcollection%26workspaceId%3D1fdff9d9-9b5e-4044-9f83-d030a0648257)

## Installation
### Installing Frontend 
Open the terminal in the folder in which you wish to clone the repository and enter the following command:
``` 
git clone https://github.com/prasoonsoni/PlagiCheck.git
cd PlagiCheck
```
Install all the NPM packages:
```
npm i 
```
In order to run the frontend:
```
npm run start
```

> **Note that you will have to add your own `.env` file at the root directory and add your own environment variables for the project to build.**

Following are the environment variables used for frontend:
- `REACT_APP_BASE_URL` - The domain name (usually http://localhost:3000)


### Installing Backend
```bash
# Install dependencies
npm install

# Add mongoURI, port and JWT_SECRET in .env file
OR
# Edit the default.json file with your mongoURI, port and JWT_SECRET
OR
# Use production.json in production env

# Run
npm start 
OR 
nodemon .\index.js
```
### Installing NLP Plagiarism Detction Part
Install virtual environment 
``` 
pip install virtualenv
```
Create a virtual environment 
```
virtualenv myenv
```
Activate the virtual environment:
```
source myenv/bin/activate
```
Install Requirements.txt
```
pip install -r
```
Run fastapi 
```
python -m uvicorn app:app --reload 
```

## <img src="https://hpe-developer-portal.s3.amazonaws.com/uploads/media/2020/3/git-icon-1788c-1590702885345.png" width="32" height="32"> Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/YourAmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some YourAmazingFeature'`)
4. Push to the Branch (`git push origin feature/YourAmazingFeature`)
5. Open a Pull Request

## 👾 Contributors

### Alok Mathur

[`E-Mail`](mailto:alok27a@gmail.com)
[`LinkedIn`](https://www.linkedin.com/in/alok-mathur-5aab4534/)

### Prasoon Soni

[`E-Mail`](mailto:prasoonsoni.work@gmail.com)
[`LinkedIn`](https://www.linkedin.com/in/prasoonsoni/)
