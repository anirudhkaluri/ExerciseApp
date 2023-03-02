<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
		<h1>Submit an Alien</h1>
		<form action="addAlien">
			<label for="aid">Alien ID:</label>
			<input type="text" name="aid" id="aid"><br>
			<label for="name">Alien Name:</label>
			<input type="text" name="name" id="name"><br>
			<label for="tech">Technology:</label>
			<input type="text" name="tech" id="tech"><br>
			<input type="submit"><br>
		
		</form>
		
		<br>
		<br>
		<br>
		
		<h1>Get an Alien</h1>
		<form action="getAlien">
			<label for="alienID">Enter Alien Id:</label>
			<Input type="text" name="aid" id="alienID"><br>
			<input type="submit">
		</form>
		
		<h1>Get Aliens by entering Technology</h1>
		<form action="getWithTech">
			<label for="tech">Enter Alien Tech:</label>
			<Input type="text" name="tech" id="tech"><br>
			<input type="submit">
		</form>
		
		

</body>
</html>