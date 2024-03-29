# Charicha Gaming - Social Gaming Site
Charicha gaming is introducing it's league and opening it's registration for Fifa S3 League online.
<p align="center">
	<img alt="Charicha Gaming Landing Page" src="assets/chc_gaming_landing.png" width="80%"/>
</p>

## Minimal Viable Product 
- Website to register for the Charicha League, Fifa League Season 3
- Mobile responsive site, where you can easily register using mobile
- Khalti Online Payment integration, so easy payment of the registration fee.

[![Charicha Gaming Live](https://img.shields.io/github/v/tag/dioveath/chc-gaming?color=red&include_prereleases&label=live&style=for-the-badge)](https://chc-gaming.herokuapp.com)


# Backend Architecture (Microservices API Gateway) 
We would like to create microservices for many business modules working independently.
All Business models will be created in Clean Architecture Pattern.


## Clean Architecture by Uncle Bob
- Independent of Frameworks. The architecture does not depend on the existence of some library of feature laden software. This allows you to use such frameworks as tools, rather than having to cram your system into their limited constraints.
- Testable. The business rules can be tested without the UI, Database, Web Server, or any other external element.
- Independent of UI. The UI can change easily, without changing the rest of the system. A Web UI could be replaced with a console UI, for example, without changing the business rules.
- Independent of Database. You can swap out Oracle or SQL Server, for Mongo, BigTable, CouchDB, or something else. Your business rules are not bound to the database.
Independent of any external agency. In fact your business rules simply don't know anything at all about the outside world.

# Milestones
- Create Khalti Verification API for server

## Login
![Charicha Gaming Login Page](assets/chc_gaming_login.png)

# Scenario 
1. User registers in charichaleague by going to our website www.charichaleague.com (currently not live.)
2. User register for Fifa League Season 3 from available Tourneys.
3. User gets Fifa League Season 3 unique registration ID.
4. When the league starts user comes in the event and verifies himself with reg ID from previous.
5. User plays his match and gets his updates on his profile.


# API 
	- Status 
		- 'success'
			Successful query.
		- 'fail'
			Failed query.
			
# API Resources
## Users
	-  A User Resource Represents a single user, containing properties, 
		- first_name
		- last_name
		- gaming_name
		- email
		- password
		- ...etc


## Role Based Users Usage | Access Control API
	Access Control is done with JWT Token. 
	

### Gamer
- Can register play tournaments overall Charicha Gaming main focus

### Moderator 
- Upper Level role handling all sorts of managing, users/gamers created by Manager to handle tourneys.
- Kind of support group for Manager in handling Charicha Gaming Tourneys.

### Manager
- Can Create, Manage and Organize any kind of Leagues, Tourneys, etc.
- Can Block, Kick, and take certain decisions based on the leagues, and tourneys they're managing.

### Editor 
- Editor can handle other managers.

### Admin
- In charge of handling users, moderator, managers, users roles,  any kind of upper lever permissions is given to admin.


### Ranks for all Users
Whatever role you may have, by heart we are all gamers in this Community. So, everyone gets a rank.
From Manager to Admin, we have got ranks for all.

### Rank hierarchy, 
- Noob
- Amatuer
- Semi-pro
- Pro
- Elite
- Candidate Master
- Master
- World-Class
- Legendary
- Immortal

## Permissions
	Permissions is an array of string with specific syntax,
### Syntax
	`<action>:<resourceType>:<resourceId>`
#### Action
- read
- update
- create
- delete
- own (combination of all action)

#### Resource Type
- Users
- Tourneys
- Matches
- Roles

### Resource ID
- <resourceId> Specific ID:  (like, 6278f1102a76784ab87b45fe)
- all (all resources)

### Example
	`read:users:6278f1102a76784ab87b45fe`


## Matches
- A Match Resource Represents a single match. 

## Tourneys
- A Tourney Resource Represents a single Tourney.
- Tourney can choose available format for doing knockout, league, group-staged or combination of all.
- Tourney can be customized through logo, banners, type of format, prize distribution, sponsorships.
- Anyone will be able to share as well as integrate tourney info through iframe.

# Custom Game Inegration System
In the near future, we'll build a system that would be helpful for game developers to integrate their games within our Gaming ecosystem.

## Getting Started

### Docker Setup
docker-compose up --force-recreate is one option, but if you're using it for CI, I would start the build with docker-compose rm -f to stop and remove the containers and volumes (then follow it with pull and up).

This is what I use:
```dockerfile
docker-compose rm -f
docker-compose pull
docker-compose up --build -d
```
# Run some tests
```bash
./tests
docker-compose stop -t 1
```
The reason containers are recreated is to preserve any data volumes that might be used (and it also happens to make up a lot faster).

If you're doing CI you don't want that, so just removing everything should get you want you want.

Update: use up --build which was added in docker-compose 1.7
