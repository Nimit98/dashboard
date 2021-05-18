import React, { PureComponent, useEffect, useRef } from 'react';

import {
    Bar,
    Legend,
    ResponsiveContainer,
    Tooltip,
   Treemap, 
} from 'recharts';
import * as d3 from 'd3';
import './TreeMap.css';

// const data = [
//     {
//         name:'Female',
//         children: [
//             {
//                 name:"<20yrs 8%",
//                 size: 8 
//             },
//             {
//                 name:"21-30yrs 30%",
//                 size: 30 
//             },
//             {
//                 name:"31-40yrs 22%",
//                 size: 22 
//             },
//             {
//                 name:"41+yrs 7%",
//                 size: 7 
//             },
//         ],
//     },
//     {
//         name:'Male',
//         children: [
//             {
//                 name:"<20yrs 5%",
//                 size: 5 
//             },
//             {
//                 name:"21-30yrs 7%",
//                 size: 7 
//             },
//             {
//                 name:"31-40yrs 12%",
//                 size: 12 
//             },
//             {
//                 name:"41+yrs 10%",
//                 size: 10 
//             },
//         ],
//     },
// ];

const color=['#0000CD','#191970'];
const labels=['<20','21-30','31-40','41+'];

const TreeMap = ({data_new}) => {
    const width=700
    const height=500
    const dataSorted = data_new.sort((row1,row2) => 
        row1.gender.localeCompare(row2.gender) 
        || row1.age - row2.age)
    .map(d => ({gender: d.gender, age: d.age}));

    const count = dataSorted.map(d=> d.gender).length;
    // console.log(count);
    //eslint-disable-next-line
    let male=dataSorted.filter(d=> d.gender==='male').reduce((prev,cur)=> (prev[cur.age] = ++prev[cur.age] || 1, prev), {});
    //eslint-disable-next-line
    let female=dataSorted.filter(d => d.gender==='female').reduce((prev,cur) => (prev[cur.age] = ++prev[cur.age] || 1, prev), {});
    // console.log(male,female);

    var childrenF={},childrenM={};
    for(let i=0;i<4;i++) {
        childrenM[labels[i]]=0;
        childrenF[labels[i]]=0;
    }
    const empty=" ", percent="%";

    for(let i=0, j=0;i<Object.keys(male).length || j < Object.keys(female).length;i++,j++) {
        if(Object.keys(male)[i]<= 20) {
            childrenM[labels[0]]+=Object.values(male)[i];
        }
        else if(Object.keys(male)[i]> 20 && Object.keys(male)[i]<= 30) {
            childrenM[labels[1]]+=Object.values(male)[i];
        }
        else if(Object.keys(male)[i]> 30 && Object.keys(male)[i]<= 40) {
            childrenM[labels[2]]+=Object.values(male)[i];
        }
        else if(Object.keys(male)[i]> 40) {
            childrenM[labels[3]]+=Object.values(male)[i];
        }

        if(Object.keys(female)[j]<= 20) {
            childrenF[labels[0]]+=Object.values(female)[j];
        }
        else if(Object.keys(female)[j]> 20 && Object.keys(female)[j]<=30) {
            childrenF[labels[1]]+=Object.values(female)[j];
        }
        else if(Object.keys(female)[j]> 30 && Object.keys(female)[j]<=40) {
            childrenF[labels[2]]+=Object.values(female)[j];
        }
        else if (Object.keys(female)[j]> 40) {
            childrenF[labels[3]]+=Object.values(female)[j];
        }
    }

    let childrenMale=[],childrenFemale=[];
    // childrenMale.push({name:'Male',size:100})
    // childrenFemale.push({name:'Female',size:100})
    // childrenMale.push({category:'Male',name:'a',value:30})
    // childrenMale.push({category:'Male',name:'a',value:40})
    // childrenMale.push({category:'Male',name:'a',value:30})
    // childrenFemale.push({category:'female',name:'a',value:30})
    // childrenFemale.push({category:'female',name:'a',value:40})
    // childrenFemale.push({category:'female',name:'a',value:30})
    for(let i=0;i<Object.keys(childrenM).length;i++) {
        if(Math.round(Object.values(childrenM)[i]/count * 100)!=0)
        childrenMale.push({
            category:"Male",
            name:String(Object.keys(childrenM)[i]) + empty + String(Math.round(Object.values(childrenM)[i]/count * 100)) + percent,
            value: Math.round(Object.values(childrenM)[i]/count * 100)
        });
    }

    for(let i=0;i<Object.keys(childrenF).length;i++) {
        if(Math.round(Object.values(childrenF)[i]/count * 100)!=0)
        childrenFemale.push({
            category:"Female",
            name:String(Object.keys(childrenF)[i]) + empty + String(Math.round(Object.values(childrenF)[i]/count * 100)) + percent,
            value: Math.round(Object.values(childrenF)[i]/count * 100)
        });
    }

    console.log(childrenMale, childrenFemale);

    const data=
        {
name:'data',

     
            children: [{
            name:'Female',
            children: childrenFemale,
        },
        {
            name:'Male',
            children:childrenMale,
        }]
    }
        
    
    
    const svgRef = useRef(null);
    const legendRef = useRef(null);
  
    function renderTreemap() {
console.log(data)
      const svg = d3.select(svgRef.current);
      svg.selectAll('g').remove();
  
      const legendContainer = d3.select(legendRef.current);
      legendContainer.selectAll('g').remove();
  
      svg.attr('width', width).attr('height', height);
  
      // create root node
      const root = d3
        .hierarchy(data)
        .sum((d) => d.value)
        .sort((a, b) => b.value - a.value);
  
      // create treemap layout
      const treemapRoot = d3.treemap().size([width, height]).padding(1)(root);
  
      // create 'g' element nodes based on data
      const nodes = svg
        .selectAll('g')
        .data(treemapRoot.leaves())
        .join('g')
        .attr('transform', (d) => `translate(${d.x0},${d.y0})`);
  
      // create color scheme and fader
      const fader = (color) => d3.interpolateRgb(color, '#fff')(0.3);
      console.log(fader)
      const colorScale = d3.scaleOrdinal(d3.schemeCategory10.map(fader));
  
      // add treemap rects
      nodes
        .append('rect')
        .attr('width', (d) => d.x1 - d.x0)
        .attr('height', (d) => d.y1 - d.y0)
        .attr('fill', (d) => d.data.category=='Male'?'#191970':'#0000CD').attr('opacity',0.7);
  
      const fontSize = 16;
  
      // add text to rects
      nodes
        .append('text')
        .text((d) =>{ 
            console.log(d)
            return`${d.data.name}`})
        .attr('data-width', (d) => d.x1 - d.x0)
        .attr('font-size', `${fontSize}px`)
        .attr('font-weight','bold')
        .attr('x', 3)
        .attr('y', fontSize).attr("fill","#fff")
        .call(wrapText);
  
      function wrapText(selection) {
        selection.each(function () {
          const node = d3.select(this);
          const rectWidth = +node.attr('data-width');
          let word;
          const words = node.text().split(' ').reverse();
          let line = [];
          let lineNumber = 0;
          const x = node.attr('x');
          const y = node.attr('y');
          let tspan = node.text('').append('tspan').attr('x', x).attr('y', y);
          while (words.length > 1) {
            word = words.pop();
            line.push(word);
            tspan.text(line.join(' '));
            const tspanLength = tspan.node().getComputedTextLength();
            if (tspanLength > rectWidth && line.length !== 1) {
              line.pop();
              tspan.text(line.join(' '));
              line = [word];
              tspan = addTspan(word);
            }
          }
          addTspan(words.pop());
  
          function addTspan(text) {
            lineNumber += 1;
            return node
              .append('tspan')
              .attr('x', x)
              .attr('y', y)
              .attr('dy', `${lineNumber * fontSize}px`)
              .text(text);
          }
        });
      }
  
      // pull out hierarchy categories
      let categories = root.leaves().map((node) => node.data.category);
      categories = categories.filter(
        (category, index, self) => self.indexOf(category) === index,
      );
  
      legendContainer.attr('width', width).attr('height', height / 6);
  
      // create 'g' elements based on categories
      const legend = legendContainer.selectAll('g').data(categories).join('g');
  
      // create 'rects' for each category
    
      legend
        .append('rect')
        .attr('width', fontSize)
        .attr('height', fontSize)
        .attr('x', fontSize)
        .attr('y', (_, i) => fontSize * 2 * i)
        .attr('fill', (d) => d=='Male'?'#191970':'#0000CD').attr('opacity',0.7);
  
      // add text to each category key
      legend
        .append('text')
        .attr('transform', `translate(0, ${fontSize})`)
        .attr('x', fontSize * 3)
        .attr('y', (_, i) => fontSize * 2 * i)
        .style('font-size', fontSize)
        .text((d) => d);
    }
  
    useEffect(() => {
      renderTreemap();
    }, [data]);
  

    return (
         <div id="TreeMap" style={{margin:"20px"}} >
            <h1 id="TreeMapHeading">TreeMap</h1>
            <div>
            <svg ref={legendRef} />
            </div>
            <svg ref={svgRef} />
     
          
        </div>
    )
}

export default TreeMap;
