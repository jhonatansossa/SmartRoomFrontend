import {React} from "react";
import ReactTooltip from "react-tooltip";

function OverviewTopDownStaticElement(props) {

    return (
        <>
            <div id={props.id}
                 data-tip
                 data-for={props.id + 'ToolTip'}/>
            <ReactTooltip id={props.id + 'ToolTip'}>
                <span>{props.name}</span>
            </ReactTooltip>
        </>
    );
}

export default OverviewTopDownStaticElement;