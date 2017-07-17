describe('Redmine Demo App', function() {
	
	
	var usname='Test1707_0';
    var usname_1='Test1707_1';
	var identifierOfTheproject;
	
	
	//This function is then used to generate a long random string to serve as an identifier in the created project
function randomString(length){

    var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyz0123456789";
    for(var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
	
var loginPage = function() {
 
  var usernameInput=element(by.name('username'));
  var passwordInput= element(by.name('password'));
  var submitButton =  element(by.name('login'));
  var activeUser =   element(by.id('top-menu')).element(by.className('user active'));
  var loginButton = element(by.name('login'));
  
  this.get = function() {
    browser.get('http://demo.redmine.org/login');
	expect (loginButton.isDisplayed());
  };

  this.login = function(username) {
    usernameInput.sendKeys(username);
	passwordInput.sendKeys(username);
    submitButton.click();
  };
  
  this.checkLoginSuccess = function(username) {
       
    expect (activeUser.getText()).toEqual(username);
	
  };
};


var registrationPage = function() {
    var loginInput= element(by.id('user_login'));
    var passwordInput=element(by.id('user_password'));
    var passwordConfirmInput=element(by.id('user_password_confirmation'));
    var firstNameInput=element(by.id('user_firstname'));
    var lastNameInput=element(by.id('user_lastname'));
    var mailInput=element(by.id('user_mail'));
    var languageInput=element(by.id('user_language'));
    var submitButton=element(by.name('commit'));
    var activeUser =   element(by.id('top-menu')).element(by.className('user active'));

  this.get = function() {
    browser.get('http://demo.redmine.org/account/register');
	expect (lastNameInput.isDisplayed());
  };
  
  this.register = function(username) {
    loginInput.sendKeys(username);
	passwordInput.sendKeys(username);
	passwordConfirmInput.sendKeys(username);
	firstNameInput.sendKeys(username);
	lastNameInput.sendKeys(username);
	mailInput.sendKeys(username.concat('@gmail.com'));
	languageInput.sendKeys('English');
	submitButton.click();
  };
  
  this.checkRegisterSuccess = function(username) {
    
	expect (activeUser.getText()).toEqual(username);
	
	
  };
  
  
  
};

var myAccountPage = function() {
 
  var deleteAccountButton=element(by.className('icon icon-del'));
  var confirmCheckBox= element(by.id('confirm'));
  var submitButton =  element(by.name('commit'));
  var signOutButton= element(by.className('logout'));
  var activeUser =   element(by.id('top-menu')).element(by.className('user active'));
  this.get = function() {
    browser.get('http://demo.redmine.org/my/account');
    expect (activeUser.isDisplayed());
	
  };

  this.deleteAnAccount = function() {
    deleteAccountButton.click();
	confirmCheckBox.click();
    submitButton.click();
  };
  
  this.checkDeletionAndSignOutSuccess = function() {
    expect (element(by.className('login')).isDisplayed());
	
  };
  
  this.signOut = function() {
    signOutButton.click();
	
  };
  
};


var newProjectPage = function() {
 
  var addProjectButton=element(by.className('contextual')).element(by.className('icon icon-add'));
  var projectNameInput= element(by.id('project_name'));
  var projectIdentifierInput =  element(by.id('project_identifier'));
  var submitButton= element(by.name('commit'));
  var mainMenu= element(by.id('main-menu'));
  this.get = function() {
    browser.get('http://demo.redmine.org/projects');
    expect (addProjectButton.isDisplayed());
	
  };
//This method also returns an identifier of the project apart from creating a project. This identifier will be further used in getting a project page
  this.createNewProject = function(projectName) {
    addProjectButton.click();
	projectNameInput.sendKeys(projectName);
	var identifier=randomString(15);
	projectIdentifierInput.sendKeys(identifier);
	submitButton.click();
	return projectName.concat(identifier);
  };
  
  this.checkCreateProjectSuccess = function(projectName) {
   	expect(mainMenu.isDisplayed());
	
  };
  
  this.signOut = function() {
    signOutButton.click();
	
  };
  
};

var projectPage = function() {
 
  var closeProjectButton=element(by.className('icon icon-lock'));
  var overviewButton= element(by.className('overview'));
  var overviewSelectedButton = element(by.className('overview selected'));
  var goToIssueButton = element(by.className('list issues sort-by-id sort-desc ')).all(by.className('id'));
  var unlockButton = element(by.className('icon icon-unlock'));
  
  //Variables regarding adding new issue functionality
  var newIssueButton=element(by.className('new-issue'));
  var subjectInput=element(by.id('issue_subject'));
  var submitButton=element(by.name('commit'));
  var issuesSelectedButton= element(by.className('issues selected'));
  var issuesButton= element(by.id('header')).element(by.className('issues'));
  var statusOfIssueLabels= element.all(by.className('status'));
  
  
  //Variables regarding log time functionality
  var logTimeButton = element.all(by.className('icon icon-time-add')).get(0);
  var timeHoursInput= element(by.id('time_entry_hours'));
  var activityInput= element(by.id('time_entry_activity_id'));
  var spentTimeLabel= element(by.className('icon icon-time'));
  
  //Variables regarding adding new user functionality
  var settingsButton=element(by.className('settings'));
  var membersButton=element(by.id('tab-members'));
  var addMemberButton=element(by.id('tab-content-members')).element(by.className('icon icon-add'));
  var parentElementInDialogWindow = element(by.className('ui-dialog ui-widget ui-widget-content ui-corner-all ui-front modal ui-draggable'));
  var searchFieldInDialogWindow= parentElementInDialogWindow.element(by.name('principal_search'));
  var usersCheckBoxInDialogWindow = parentElementInDialogWindow.element(by.name('membership[user_ids][]'));
  var rolesCheckBoxInDialogWindow = parentElementInDialogWindow.all(by.name('membership[role_ids][]'));
  var submitButtonInDialogWindow = parentElementInDialogWindow.element(by.id('member-add-submit'));
  var usersInMembersTable = element(by.id('tab-content-members')).all(by.className('user active'));
  var assignIssueInput =  element(by.id('issue_assigned_to_id'));
  var assignedToLabel= element(by.className('issue tracker-1 status-1 priority-4 priority-default created-by-me details'))
                      .element(by.className('attributes'))
                      .element(by.className('user active'));     
 
 
 this.get = function(projectName) {
 
    browser.get('http://demo.redmine.org/projects/'+projectName);
    expect (overviewSelectedButton.isDisplayed());
	
  };
  
  //use get() before using this method 
  this.closeProject = function(projectName) {
    closeProjectButton.click();
	browser.switchTo().alert().accept();
  };
  
  this.checkCloseProjectSuccess = function(projectName) {
   	expect(unlockButton.isDisplayed());
	
  };
  
  this.addNewIssue = function(issuename) {
    newIssueButton.click();
	subjectInput.sendKeys(issuename); 
	submitButton.click();
	
  };
  
  this.addNewIssueAndAssignIt = function(username,issuename) {
    newIssueButton.click();
	subjectInput.sendKeys(issuename); 
	assignIssueInput.sendKeys(username+' '+username);
	submitButton.click();
	
  };
  
  this.checkAddNewIssueAndAssignItSuccess = function(username) {
    
	expect (assignedToLabel.getText()).toEqual(username+' '+username);
  };
  
  this.checkAddNewIssueSuccess = function() {
     issuesSelectedButton.click(); 
	  
	 //Getting an amount of issues in the project
	 var count = statusOfIssueLabels.count();

     expect (count).toEqual(1);
	
  };
  
  this.addNewUserToTheProject = function(usname) {
     settingsButton.click();
	 membersButton.click();
	 addMemberButton.click();
	 browser.sleep(1000);
     searchFieldInDialogWindow.sendKeys(usname);
	 browser.sleep(2000);
	 usersCheckBoxInDialogWindow.click();
	 rolesCheckBoxInDialogWindow.get(0).click();
	 submitButtonInDialogWindow.click();
     
	
  };
  
  this.checkAddNewUserToTheProjectSuccess = function(identifier) {
     
	  browser.get('http://demo.redmine.org/projects/'+identifier+'/settings/members');
	  
     var count=usersInMembersTable.count();
	 //There has to be two users in the project: the one who created the project and just added one
	 expect (count).toEqual(2);
	 
	
  };
  
   this.logTime = function(hours) {
    issuesButton.click();
	goToIssueButton.get(1).click();
	logTimeButton.click();
	timeHoursInput.sendKeys(hours);
	activityInput.sendKeys('Design');
	submitButton.click();
	
  };
  
  this.checkLogTimeSuccess = function(hours) {
    overviewButton.click();
    expect (spentTimeLabel.getText()).toEqual(hours+'.00 hours');
  
};

}

    var registrationpage = new registrationPage();
	var myaccountpage = new myAccountPage();
	var loginpage=new loginPage();
	var newprojectpage = new newProjectPage();
	var projectpage = new projectPage();


	beforeAll(() => {
        //The source is not angularjs app
		browser.waitForAngularEnabled(false);
    });
	
	
 it('should register a user', function() {

   //Creating user Test1707_0
	registrationpage.get();
	registrationpage.register(usname);
    registrationpage.checkRegisterSuccess(usname);
	
	
	myaccountpage.signOut();
	myaccountpage.checkDeletionAndSignOutSuccess();
	
 });
 
 it('should  login with registered user', function() {

  
	loginpage.get();
	loginpage.login(usname);
    loginpage.checkLoginSuccess(usname);
    
  

 });
 
 it('should add a project, an issue and an user to it', function() {
    
	//Creating a new user Test1707_1 just to be sure that there is at least one more user in the system except of the one who will add a project. This user will be a new member of the project
	myaccountpage.signOut();
	myaccountpage.checkDeletionAndSignOutSuccess();
	
	registrationpage.get();
	registrationpage.register(usname_1);
    registrationpage.checkRegisterSuccess(usname_1);
	
	myaccountpage.signOut();
	myaccountpage.checkDeletionAndSignOutSuccess();
	
	//Logging in again with the user Test1707_0
	loginpage.get();
	loginpage.login(usname);
    loginpage.checkLoginSuccess(usname);
	
   
   //Creating new project
   newprojectpage.get();
   //Identifier is required to get the correct URL of the project page
   identifierOfTheproject=newprojectpage.createNewProject(usname);
   newprojectpage.checkCreateProjectSuccess(usname);

   //Adding new issue
   projectpage.get(identifierOfTheproject);
   projectpage.addNewIssue('Issue#1');
   projectpage.checkAddNewIssueSuccess();
   
   //Adding new user (Test1707_1) to the project 
   projectpage.addNewUserToTheProject(usname_1);
   projectpage.get(identifierOfTheproject);
   projectpage.checkAddNewUserToTheProjectSuccess(identifierOfTheproject);
   
   
 });
 
 it('should add an issue and assign it to the user ', function() {
     
	 projectpage.get(identifierOfTheproject);
     projectpage.addNewIssueAndAssignIt(usname_1,'Issue#2');
   
     projectpage.checkAddNewIssueAndAssignItSuccess(usname_1);
	
 });
 
 it('should log time by two users-members and check the sum value of time ', function() {
     
	 //Logging time by Test1707_0 user 
	 projectpage.get(identifierOfTheproject);
	 projectpage.logTime(10);
	 projectpage.checkLogTimeSuccess(10);
	 
	 //Signing out by the Test1707_0 user 
	 myaccountpage.get();
	 myaccountpage.signOut();
	 
	 //Logging time by Test1707_1 user 
	 loginpage.get();
	 loginpage.login(usname_1);
	 projectpage.get(identifierOfTheproject);
	 projectpage.logTime(11);
	 
	 projectpage.checkLogTimeSuccess(21);
	 
	
	
	
 });
 
 
 afterAll(() => {
	  	
		//deleting user Test1707_1
		myaccountpage.get();
		myaccountpage.deleteAnAccount();
		myaccountpage.checkDeletionAndSignOutSuccess();

	    
	    loginpage.get();
	    loginpage.login(usname);
	 
	 
	    //Closing the project that belongs to user Test1707_0
        projectpage.get(identifierOfTheproject);
        projectpage.closeProject();
        projectpage.checkCloseProjectSuccess();
		
	 
	    //Deleting current user Test1707_0
		myaccountpage.get();
		myaccountpage.deleteAnAccount();
		myaccountpage.checkDeletionAndSignOutSuccess();
		
	
		
	
		
		
 
});
	
	
});