import wineglass from "../../images/wineglass.png"
import "./Loading.css"

//Ett snurrande vinglas medan sidan laddar.
function Loading(){
    return (
        <img src={wineglass} className="loader"></img>
      );
}

export default Loading