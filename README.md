# Code-Alchemy-Blog-App
A blog app project for writing about Finance, Software development and the occult. The project is written in React,  express and SQL 
<br/>
<br/>
## Code Alchemy ERD
Here's a simple Entity-Relationship Diagram (ERD) based on a similar DBML (Database Markup Language) : 
<br/>
<br/>
<br/>
![Code_Alchemy_ERD](https://github.com/michaelkariuki/Code-Alchemy-Blog-App/assets/26003984/27517e0b-9b1f-4f2e-89fe-ff294453d599)

<br/>
<br/>

## Code Alchemy Database Markup Language (DBML)
For those interested in messing around with a similar database design

```
Table User {
  user_id int [primary key]
  username varchar(50)
  first_name varchar(50)
  last_name varchar(50)
  email varchar(100)
  password varchar(255) // Storing hashed passwords
  role varchar(20)
  created_at datetime
  updated_at datetime
}

Table Profile {
  profile_id int [primary key]
  picture blob // Assuming BLOB data type for storing images
  bio text // Assuming TEXT data type for a longer bio description
  location varchar(100)
  interests text // Assuming TEXT data type for a list of interests
  user_id int [ref: - User.user_id] //ONE to ONE relationship
}

Table Category {
  category_id int [primary key]
  name varchar(20)
  created_at datetime
  updated_at datetime
}

Table Blog {
  blog_id int [pk]
  title varchar(100)
  body text
  author_id int [ref: > User.user_id] 
  category_id int [ref: > Category.category_id] 
  publication_date datetime
  status varchar(20) 
  views int
  created_at datetime
  updated_at datetime
}


Table Tag {
  tag_id int [primary key]
  name varchar(20)
  created_at datetime
  updated_at datetime
}

Table BlogTag { // Junction table for many-to-many relationship
  blog_id int [ref: > Blog.blog_id]
  tag_id int [ref: > Tag.tag_id]
  primary key (blog_id, tag_id)
}

Table Comment {
  comment_id int [primary key]
  content text // Assuming TEXT data type for the comment content
  author_id int [ref: > User.user_id] // Foreign key referencing User table's user_id
  blog_id int [ref: > Blog.blog_id] // Foreign key referencing Blog table's blog_id
  parent_comment_id int [ref: > Comment.comment_id] // Self-referential foreign key referencing Comment table's comment_id
  created_at datetime
  updated_at datetime
}

Table CommentLikes {
  like_id int [primary key]
  comment_id int [ref: > Comment.comment_id]
  user_id int [ref: > User.user_id]
  created_at datetime
}
```
