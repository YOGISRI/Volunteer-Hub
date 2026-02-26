import "./Loader.css";

export default function Loader({ fullScreen = false }) {
    return (
        <div className={fullScreen ? "loader-container fullscreen" : "loader-container"}>
            <div className="spinner"></div>
        </div>
    );
}