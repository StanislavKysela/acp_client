import ToHomeButton from "../components/RedirectButtonsComponents/ToHomeButton";

function NoMatchPage() {

  
    return (
      <div className="NoMatch">
          <div className="NoMatchLeft"><h3>Nenašli sme požadovanú stránku</h3></div>
          <div className="NoMatchRight"><ToHomeButton doRedirect={"false"}/></div>
      </div>
    );
  }
  
  export default NoMatchPage;