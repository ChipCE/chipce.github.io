# EZconfig - html config generator manual  
This is the manual of EZconfig - html config generator tool. Unlike the old version that require to modify frontend webUI ,frontend javascript and python backend to add new config, this version use javascript to auto generate the config string so only modify the frontend webUI(ezconfig.html) is needed.


## How to use
- Use the html config generator at https://ezfirmware.th3dstudio.com/generator/ to genarate the html string
- Copy and paste the string into <code>/home/compiler/ezfirmware/webGUI/GUI/templates/GUI/ezconfig.html</code>
- Restart the server with <code>ezfirmware --restart</code> command.

### 1.Config level
- Main : This config will be showed by default.  
- Sub : this config will be hided by default, only visible when some conditions meet.  

### 2.Config type
- Dropdown select : This type of config will let user select one of many available options.(ex ; printer type)  
- Checkbox : Select to enable/disable config option.  
- Text : Make a text box for text input (ex: printer custom name).  
- Number : Same as text, but only number input are allowed.


### 3. Config parameter

#### 3.1 Common config parameter
- Display text : The label of config will be displayed in web UI.  
- Config description :  The short description of config will be displayed in web UI.  
- Config id : The ID of config, should be the same as the config string in configuration.h. (ex: for #define SNAKEOIL, the config id should be SNAKEOIL)  

#### 3.2 Dropdown select only config parameter
- Append Id : Append the id of config into config string  
Example: The config id is <code>PRINTER_TYPE</code> and user selected <code>ENDER3</code> in dropdown menu.  
With <code>Append id</code>=<code>true</code> the config string will be <code>#define PRINTER_TYPE ENDER3</code>  
With <code>Append id</code>=<code>false</code> the config string will be <code>#define ENDER3</code>  

- Config args : The availabe select options. Seperated by <code>,</code>. The first option will be selected by default.  
Example <code>ENDER3,ENDER5,CR10</code>  

#### 3.3 Checkbox only config parameter
- Default value : The default value of checkbox, should be <code>true</code> or <code>false</code>  

#### 3.4 Text only config parameter
- Required : If the input field can be leave blank or not.  
- Force macro : Option to wrap config string in double qoute.  
Example : Text config with id = PRINTER_NAME and user entered "ENDER3000"   
With <code>Force macro</code>=<code>true</code> the config string will be <code>#define PRINTER_NAME ENDER3000</code>  
With <code>Force macro</code>=<code>false</code> the config string will be <code>#define PRINTER_NAME "ENDER3000"</code>  
- Default value : The default value of text input.  

#### 3.5 Numer only config parameter
- Default value : The default value of text input.(must be a number)  

### 3.6 Sub level only config parameter
Sub level config is hide by default and only visible when some conditions meet.  
- Target config : the id of condition.  
- Target value : the value of condition.  

Example 1 : A config option only visible when user selected ENDER3 or ENDER5 in PRINTER_TYPE config
<code>Target config</code>=<code>PRINTER_TYPE</code>  
<code>Target value</code>=<code>ENDER3,ENDER5</code>  

Example 2 : A config option only visible when user enabled LINEAR_ADVANCE
<code>Target config</code>=<code>LINEAR_ADVANCE</code>  
<code>Target value</code>=<code>true</code>  

- Has sub : By default sub level config won't able to be used as condition for other sub level config. Enable this if this config will be used as condition for other sub level config.