const btnE1=document.getElementById('btnn');
const AppE1=document.getElementById('App');
getNotes().forEach((note) => {
    const noteE1=createNoteE1(note.id,note.content);
    AppE1.insertBefore(noteE1,btnE1)
    
});

function createNoteE1(id,content){
    const ele=document.createElement('textarea');
    ele.classList.add("note");
    ele.placeholder="Empty Note";
    ele.value=content;
    ele.addEventListener("dblclick",()=>{
        const warning=confirm('Do you want to delete idot?');
        if(warning){
            deleteNote(id,ele);
        }
    });
    ele.addEventListener("input",()=>{
        updateNote(id,ele.value);
    });

    return ele;

}
function deleteNote(id,ele){
    const notes=getNotes();
    const updatenotes=notes.filter((note)=>note.id!=id);
    saveNote(updatenotes);
    AppE1.removeChild(ele);

}
function updateNote(id,content){
    const notes=getNotes();
    const target=notes.filter((note)=> note.id==id)[0];
    target.content=content;
    saveNote(notes);

}
function addNote(){
    const notes=getNotes();
    const noteObj={
        id:Math.floor(Math.random()*10000),
        content:""


    };
    const noteE1=createNoteE1(noteObj.id,noteObj.content);
    AppE1.insertBefore(noteE1,btnE1);
    notes.push(noteObj); 
    saveNote(notes);
}
function saveNote(notes){
    localStorage.setItem("note-app",JSON.stringify(notes));

}
function getNotes(){
    return JSON.parse(localStorage.getItem("note-app") || "[]" );
}

btnE1.addEventListener("click",addNote);