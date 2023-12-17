import "./RainState.scss"
function RainState(props) {
    const { rain } = props
    return (
        <>
            {rain && (
                <div className='rain'>
                    <div className="rain-drop"></div>
                    <div className="rain-drop"></div>
                    <div className="rain-drop"></div>
                    <div className="rain-drop"></div>
                    <div className="rain-drop"></div>
                    <div className="rain-drop"></div>
                    <div className="rain-drop"></div>
                    <div className="rain-drop"></div>
                    <div className="rain-drop"></div>
                    <div className="rain-drop"></div>
                    <div className="rain-drop"></div>
                    <div className="rain-drop"></div>
                    <div className="rain-drop"></div>
                    <div className="rain-drop"></div>
                    <div className="rain-drop"></div>
                </div>
            )}
        </>
    )
}
export default RainState