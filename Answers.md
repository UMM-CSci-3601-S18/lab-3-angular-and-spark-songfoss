1. Have 3 .gitignore in total.  One is in the the main directory. One is in the server directory. One is the client directory,
 There various .gitignore files help communicate what files to not commit to github. For example, 
 if a parent node tells its child node to ignore all jar files, but the child node wants to have one specific jar file, the child will be able to commit its jar file. 
 Also, compared to the last lab we have multiple .gitignore files.
 
 2.There are 3 gradle files. One is in the client. One is in the server. One is in the spark directory.
 The gradle file in the spark directory is for organization purposes it links to the server and 
 client gradle files. The gradle file in server directory runs the server and its tests. The gradle file in
 the client directory runs the client stuff and its tests. 

3. 

4. user-list.service.ts gets the information from the server. User-list.component.ts talks to user-list.service.ts
 and it handles the logic for the service like filtering users. They are separated from each other since they do
 different things. Also, user-list.service.ts can communicate with an unlimited amount of components.
