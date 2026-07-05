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
         if(value===task.secondElementChild.textContent){
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
    document.getElementById("task").value=""; 
    document.getElementById("task") .focus();
    const deletebutton=deleteTask(newtask,div) ;
    updateTask(newtask, span,deletebutton,div);
    }
}

function checkboxcheck(event){
  if(event.target.checked){
    const parent=event.target.parentElement;
    parent.classList.add("check");
    document.getElementById("task").focus();



  }else{
    const parent=event.target.parentElement;
    parent.classList.remove("check");
    document.getElementById("task").focus();
    
  }

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

        }
         
    });
    return deletebutton;

}
function updateTask(newtask ,span,deletebutton,div){
    const updatebutton=document.createElement('button');
    updatebutton.className="updatebtn";
    updatebutton.textContent="UPDATE";
    div.appendChild(updatebutton);
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
            span.textContent=inputbox.value;
            inputbox.remove();
            save.remove();
            span.style.display = "";  
            div.style.display="";     

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

