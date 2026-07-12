loadTask();

function addTask(){
    const value=document.getElementById("task").value.trim();
      if(!value){
        alert("Please enter task!");
        document.getElementById("task").focus();
        return;
    }    
    else{
        const list=document.querySelector(".list");
        const tasklist=list.children;    
        for(let task of tasklist){
         if (value === task.children[1].textContent) {
            alert("This task exists!");
            document.getElementById("task").value="";
        document.getElementById("task").focus();
        return;
        }
        }
        const newtask=document.createElement("li");
    newtask.className="newtask";    
    const span=document.createElement("span");
    const checkbox=document.createElement("input");
    checkbox.type="checkbox";
    checkbox.className="checkclass";
    checkbox.addEventListener("change",checkboxcheck);

    const div=document.createElement("div");
    div.className="div";
    span.textContent=value;
    newtask.append(checkbox);
    newtask.append(span);
    newtask.append(div);
    list.append(newtask);

    saveTask();

    document.getElementById("task").value=""; 
    document.getElementById("task") .focus();
    const deletebutton=deleteTask(newtask,div) ;
    updateTask(newtask, checkbox,span,deletebutton,div);
    }
}

function checkboxcheck(event){
    const parent=event.target.parentElement;
    const span = parent.querySelector("span");
    const updateBtn = parent.querySelector(".updatebtn");
  if(event.target.checked){
     span.style.textDecoration = "line-through";
        updateBtn.style.display = "none";
    
    document.getElementById("task").focus();



  }else{
   span.style.textDecoration = "none";
updateBtn.style.display = "block";
    document.getElementById("task").focus();
    
  }
  saveTask();

}
   
function deleteTask(newtask,div){
    const deletebutton=document.createElement('button');
    deletebutton.className="deletebtn";
    deletebutton.textContent="DELETE";
    div.appendChild(deletebutton);
    deletebutton.addEventListener("click",function(){
        let confirmation=confirm("Are you sure you wan't to delete this task?");
        if(confirmation){
            newtask.remove();
            saveTask();

        }
         
    });
    return deletebutton;

}
function updateTask(newtask,checkbox ,span,deletebutton,div){
    const updatebutton=document.createElement('button');
    updatebutton.className="updatebtn";
    updatebutton.textContent="UPDATE";

    div.appendChild(updatebutton);
    if(checkbox.checked){
        updatebutton.style.display="none";
    }
    updatebutton.addEventListener("click",function(){
        let temp=span.textContent;
        span.style.display = "none";
        div.style.display = "none";
        const inputbox=document.createElement("input");
        inputbox.type="text";
        inputbox.id="input";
        inputbox.placeholder=temp;
        inputbox.value=temp;
        const save=document.createElement("button");
        save.className="savebtn";
        save.textContent="SAVE";
        newtask.append(inputbox);
        newtask.append(save);
        save.addEventListener("click",function(){
            let updatedvalue=inputbox.value.trim();
            if(updatedvalue==""){
                alert("Task cannot be empty!");
                inputbox.focus();
                return;
            }

const tasks = document.querySelectorAll(".newtask span");

    for(let task of tasks){

        if(task !== span && task.textContent === updatedvalue){
            alert("Task already exists!");
            inputbox.focus();
            return;
        }

    }
            span.textContent=updatedvalue;
            inputbox.remove();
            save.remove();
            span.style.display = "";  
            div.style.display=""; 
            saveTask();    

    });

   });
}

function showTask(){
    const listbody=document.querySelector(".tasklist");
    const btn=document.getElementById("show");
    
    if(listbody.classList.contains("hidden")){
        listbody.classList.remove("hidden");
    btn.textContent="HIDE LIST";
    }else{
       listbody.classList.add("hidden");
       btn.textContent="SHOW LIST";

    }


}



function saveTask(){
    const list=document.querySelector(".list");
        const tasklist=list.children;    
    const tasks=[];
        for(let task of tasklist){
            const taskdata={};
            taskdata["task_name"]=(task.children[1].textContent);
            taskdata["task_status"]=(task.children[0].checked);
            tasks.push(taskdata);
            console.log(tasks);
            

}
localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTask(){

    const data=localStorage.getItem("tasks");
    if(!data){
        return;
    }
    const tasks=JSON.parse(data);
    console.log(tasks);
     const list=document.querySelector(".list");
    for(let task of tasks){
              const newtask=document.createElement("li");
    newtask.className="newtask";    
    const span=document.createElement("span");
    span.className="spancheck";
    const checkbox=document.createElement("input");
    checkbox.type="checkbox";
    checkbox.className="checkclass";
    checkbox.checked = task["task_status"];
    checkbox.addEventListener("change",checkboxcheck);
    
    if(checkbox.checked){
    span.classList.add("spancheck");
    

}else{
    span.style.textDecoration="none";
}
    const div=document.createElement("div");
    div.className="div";
    span.textContent=task["task_name"];
    newtask.append(checkbox);
    newtask.append(span);
    newtask.append(div);
    list.append(newtask);    
    const deletebutton=deleteTask(newtask,div) ;
    updateTask(newtask,checkbox, span,deletebutton,div);

    }
}
