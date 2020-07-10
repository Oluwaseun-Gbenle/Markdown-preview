import React, { Component } from 'react';
import marked from 'marked';
import './mark.css';

const Default = 
`# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:
  
Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | ------------- 
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS522cvfykAGpHa9VldhoyaVHuQY6PtojUdnw&usqp=CAU)
`;
const renderer = new marked.Renderer()
renderer.link = (href, title, text) => {
  return `<a href=${href} target="_blank">${text}</a>`
};
const Preview = (props) => {
  return (<div id="preview" dangerouslySetInnerHTML={props.input}/>)
}
const Window = props => {
  return (
    <div className="window">
      <header>
        <h1>{props.heading}</h1>
      </header>
      {props.category}
    </div>
  );
};



class Markdown extends React.Component {
    constructor() {
      super();
      this.state = {
        input: Default,
        maxPreviewDisplay:false
      }
      this.handleChange=this.handleChange.bind(this);
   this.createMarkUp=this.createMarkUp.bind(this); 
    this.maxPreview=this.maxPreview.bind(this);  
    };
    handleChange(e) {
      this.setState({
        input: e.target.value
      });
    }
   
   createMarkUp () {
      return {
        __html: marked(this.state.input, {
          breaks: true,
          renderer: renderer,
        })
      }
    }
  maxPreview(){
   this.setState({
     maxPreviewDisplay:!this.state.maxPreviewDisplay
   }); 
  }
    render() {
      return(
        <div className="container"> 
          {this.state.maxPreviewDisplay==false? 
      <div className="left-container">
          <div id="left-header">
      <p id="left-p"><i className="fa fa-edit"></i> EDITOR </p>
          </div>
        <div  className="panel-left">
          <textarea id="editor" value={this.state.input}
            onChange={this.handleChange}/>
          </div>
           <div className="splitter">
      </div>
          </div>:<div className="no-left-container">
          <div id="left-header">
      <p id="left-p"><i className="fa fa-edit"></i> EDITOR </p>
          </div>
        <div  className="panel-left">
          <textarea id="editor" value={this.state.input}
            onChange={this.handleChange}/>
          </div>
           <div className="splitter">
      </div>
          </div>}
      {this.state.maxPreviewDisplay==false?  
        <div className="right-container">
         <div id="right-header">
           <p id="right-p"><i className="fa fa-eye"></i> PREVIEW <i id="btn" onClick={this.maxPreview} className="fa fa-arrows-alt"></i></p> 
             </div>
           <div class="panel-right">
            
           <Preview id="preview"input={this.createMarkUp()}/>
               
          </div>
          </div>:  
           <div className="large-container">
         <div id="right-header" style={{width:'98.4%'}}>
           <p id="right-p"><i className="fa fa-eye"></i> PREVIEW <i id="btn2" onClick={this.maxPreview} className="fa fa-compress"></i></p>
          </div>
           <div class="panel-right">
            
           <Preview id="preview"input={this.createMarkUp()}/>
               
          </div>
          </div>}
          </div>
        
     ); 
    }
  }
export default Markdown;