import { NavLink } from "react-router-dom";

const FamilyPreview = ({ familyData }) => {
  let familyUrlArr = familyData.url.split("/");
  return (
    <NavLink to={`/family/${familyUrlArr[familyUrlArr.length - 1]}`}>
      <div className="preview_container">
        <div>{familyData.name}</div>
        <div>Регион: {familyData.region}</div>
        {familyData.coatOfArms && (
          <div>Герб: {` ${familyData.coatOfArms.substr(0, 40)}...`}</div>
        )}
      </div>
    </NavLink>
  );
};

export default FamilyPreview;
