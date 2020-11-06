# Annapurna

<br>

![](/Users/saraamantegui/Documents/annapurna/background.jpg)

<br>



## Description

Platform designed for people who love hiking, where they can meet up for excursions to the mountain.

Admin users can create new groups and excursions meanwhile users can join existing ones and see the excursions details.



## User Stories

**Sign Up**: “As a user I want to sign up to the application so I can become a new member and take part.”.

**Login**: “As a user I want to login to the application so I can adhere or leave groups and manage my group excursions.”.

**Home page (Group list** **user**): “”As a user I want to see all the groups I'm a member of as well as all the potential groups I could be so I can decide over enrolling on them or not. As a user I want to see all the excursions I’m enrolled on.As a user I want to adhere to or leave a group so I can manage my participation on them.”.

**Home page (Group list Admin)**: “As an admin I want to see all the groups I administer so I can manage them.”.

**Meet Ups (list** **user**): “As a user I want to see all the group excursions I'm a member of as well manage my participation so I can decide about it. ”. 

**Meet Ups (list** **Admin****):“As an admin I want to see all the excursions planned so I can manage them. As an admin I want to create a new excursion from a Group so their users can meet.”.

**Meet Up (details** **user**): “As a user I want to see the excursion details so I can make sure I know them.”.

**Meet Up (details** **Admin**): “As an admin I want to modify the details of an excursion so I can properly manage them. As an admin I want to create new excursions so the members can meet more in the future.”.

**Group details (Admin):** “As an admin I want to modify the details of a group so I can properly manage them. As an admin I want to create new groups so new people can meet together.”.

<br>



## Server Routes (Back-end):

| **Method** | **Route**                | **Description**                                              | Request - Body            |
| ---------- | ------------------------ | ------------------------------------------------------------ | ------------------------- |
| `GET`      | `/`                      | Home page route. Renders home `index.hbs` view.              |                           |
| `GET`      | `/login`                 | Renders `login.hbs` form view.                               |                           |
| `POST`     | `/login`                 | Sends Login form data to the server.                         | { email, password }       |
| `GET`      | `/signup`                | Renders `signup` form view.                                  |                           |
| `POST`     | `/signup`                | Sends Sign Up info to the server and creates user in the DB. | { name, email, password } |
| `GET`      | `/logout`                | Logs user out of the page. Redirect to the index.            |                           |
| `GET`      | `/grouplist(user)`       | Renders /grlistus.hbs. An user can enter or leave a Group.   |                           |
| `POST`     | `/grouplist (user)`      | Renders group list updated /grlistus.hbs                     |                           |
| `GET`      | `/meetuplist(user)`      | Renders users joined excursions /melistus.hbs.               |                           |
| `POST`     | `/meetuplist(user)`      | Sends info updated to the DB /melistus.hbs                   |                           |
| `GET`      | `/meetupdetails (user)`  | Renders excursions details view from medetus.hbs             |                           |
| `GET`      | `/groupdetails (admin)`  | Renders group details and edition from group detail /grdetadm.hbs |                           |
| `POST`     | `/groupdetails (admin)`  | Send info updated to de DB /grdetadm.hbs                     |                           |
| `GET`      | `/meetupdetails (admin)` | Renders /melistadm                                           |                           |
| `GET`      | `/meetuplist(user)`      | Renders /melistadm                                           |                           |
|            |                          |                                                              |                           |
|            |                          |                                                              |                           |
|            |                          |                                                              |                           |
|            |                          |                                                              |                           |

## Wireframes

![](/Users/saraamantegui/Desktop/wireframes 1.png)

![wireframes 2](/Users/saraamantegui/Desktop/wireframes 2.png)

![wireframes 3](/Users/saraamantegui/Desktop/wireframes 3.png)

![wireframes 4](/Users/saraamantegui/Desktop/wireframes 4.png)

![wireframes 5](/Users/saraamantegui/Desktop/wireframes 5.png)

![wireframes 6](/Users/saraamantegui/Desktop/wireframes 6.png)

## Models

People model

`{`
`_id`

`email: String,` 

`pass: String,` 

`name: String,`

`surname: String,`

`age: Number,`

`hobbies: String`

`isAdmin: Boolean`

`}`



Group model

`{`

`_id`

`adminName: String,`

`adminSurname: String,`

`_id.People`

`groupName: String,`

`groupDescription: String`

`}`



Meetup model

`{`

`_id`

`name: String,`

`description: String,`

`date: Date,`

`hour:  Hour,`

`mapPoint:` 

`[lat]: number, mandatory,`

`[lon]: number, mandatory`

`id.Group/id.Persona`

`}`



## MVP 

The MVP covers the following:

- Mobile first  
- Sign up with authentication
- Login with authentication
- Handlebars
- Admin privilege
- Create, join, delete groups and meet ups



## Data structure

/models/
	group.js
	meetup.js
	people.js
/public
	/images
		annabackgr.jpg
		annapurna_slogan.png
		annapurna.png
	/javascripts
		map.js
    /stylesheet
		  style.css
/routes
	auth.js
	group.js
	index.js
	meetup.js
	people.js
/views
	/auth
		grcreadm.hbs
		grdetadm.hbs
		grlistadm.hbs
		grlistus.hbs
		login.hbs
		mecreadm.hbs
		medetadm.hbs
		medetus.hbs
		melistadm.hbs
		melistus.hbs
		signup.hbs
	error.hbs
	home.hbs
	index.hbs
	layout.hbs
	secret.hbs
app.js  

## APIs

- Hello maps


## Backlog

Adress field on sign up + maps /calculate distance
Admins in the future will only have one user.

To adhere to a group the process will be: an email to Admin and Admin will have to accept it. The person asking for adhesion will receive back an email with the response.

An user will see the list of people taking part in a meet up (if they have authorised to give that info). We will show list of people and total number of people.

Admins will see list of people in each group and total number of people.

## Links

### Trello (list of tasks)

https://trello.com/b/JBOBUYSg/project-m2

### **Github**



### **Slides**





