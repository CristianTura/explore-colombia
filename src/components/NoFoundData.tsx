import nofound from "assets/noFoundData.png"

const NoFoundData: React.FC = () => {
    return (
      <div className="text-center w-100 py-2">
        <img style={{ width: "100px" }} src={nofound} alt="imgNoFoundData" />
      </div>
    )
  }
  
  export default NoFoundData