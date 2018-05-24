/**
 * Created by cimin on 24/05/2018.
 */
import React from "react";
import '../style/tarifs.css'
class SpreadSheet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {

        return (
            <span>
             <table className="tablelar tablelar-highlight-all">
                 <thead>
                   <tr>
                       <th>
                           <span style={{fontSize: "15px", display: "table-caption"}}>
                            <div style={{
                                position: "relative",
                                WebkitTransform: "rotate(45deg)",
                                transform: "rotate(45)",
                                width: "131px",
                                height: "23px",
                                marginTop: "15px",
                                marginRight: "-50px"
                            }}>
                               {this.props.colLabel}
                             </div>
                            <div style={{position: "relative"}}
                            >{this.props.lineLabel}
                            </div>
                       </span>
                       </th>
                       {this.props.colTitle.map(e =>
                           <th key={e}>
                               {e}
                           </th>
                       )}
                   </tr>
                 </thead>
                 <tbody>

                 {this.props.matrix.map((tab, i) =>
                     <tr key={`tr${i}`}>
                         <td key={`td${i}`}>{this.props.lineTitle[i]}</td>
                         {tab.map((el,j) => <td
                             key={`${i},${j}`}
                             title={`version ${this.props.colTitle[j]}`}>
                             {el}
                         </td>)}
                     </tr>
                 )}
                 </tbody>
             </table>
            </span>
        );
    }
}

SpreadSheet.propTypes = {};

export default SpreadSheet;