import React from 'react';
import {
   Treemap, 
} from 'recharts';

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

    for(let i=0;i<Object.keys(childrenM).length;i++) {
        childrenMale.push({
            name:String(Object.keys(childrenM)[i]) + empty + String(Math.round(Object.values(childrenM)[i]/count * 100)) + percent,
            size: Math.round(Object.values(childrenM)[i]/count * 100)
        });
    }

    for(let i=0;i<Object.keys(childrenF).length;i++) {
        childrenFemale.push({
            name:String(Object.keys(childrenF)[i]) + empty + String(Math.round(Object.values(childrenF)[i]/count * 100)) + percent,
            size: Math.round(Object.values(childrenF)[i]/count * 100)
        });
    }

    // console.log(childrenMale, childrenFemale);

    const data=[
        {
            name:'Female',
            children: childrenFemale,
        },
        {
            name:'Male',
            children:childrenMale,
        }
    ];

    return (
        <div id="TreeMap">
            <h1 id="TreeMapHeading">TreeMap</h1>
            <Treemap 
            width={750} 
            height={300} 
            data={data} 
            dataKey="size" 
            colorPanel={color}
            aspectRatio={4/3}
            stroke="#fff"
            />
        </div>
    )
}

export default TreeMap;