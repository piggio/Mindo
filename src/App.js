import React from "react";
import { render } from "react-dom";

import "./App.css"
//import _ from "underscore";
import _ from "lodash";

class App extends React.Component {
  state = {
    position: {
      page: "home",
      id: ""
    },
    rombi: [
      { id: "1",
        left: "",
        right: "",
        selected: false,
        
        assetUrl: undefined
      },
      {
        id:"2",
        left: "",
        right: "",
        selected: false,
        
        assetUrl: undefined
      },
      {
        id: "3",
        left: "",
        right: "",
        selected: false,
        
        assetUrl: undefined
      },
      { id: "4",
        left: "",
        right: "",
        selected: false,
        
        assetUrl: undefined
      }
    ],
    scenarioSelezionato: "",
    
    romboCliccato: undefined,
    scenario: [
      {
        name: "spiaggia",
        image: "",
        assets: [
          {
            urlImage: "https://image.flaticon.com/icons/svg/169/169367.svg",
            cliccato: false
          },
          {
            urlImage: "https://image.flaticon.com/icons/svg/452/452892.svg",
            cliccato: false
          }
        ]
      },
      {
        name: "spazio",
        image: "",
        assets: [
          {
            urlImage: "https://image.flaticon.com/icons/svg/179/179558.svg"
          }
        ]
      },
      {
        name: "foresta",
        image: "",
        assets: []
      }
    ]
  };

  changePage(event) {
    let id = event.target.name;

    this.setState({
      position: {
        page: id
      }
    });
  }

  changeScenario(scenario, event) {
    let id = event.target.name;

    this.setState({
      position: {
        page: id
      },
      scenarioSelezionato: scenario
    });
  }

  selectRombo(id) {

    let statecopy = _.cloneDeep(this.state);

    if (statecopy.rombi[id].selected == false) {
      statecopy.rombi[id].selected = true;
    }
    else if (statecopy.rombi[id].selected ) {
      statecopy.rombi[id].selected = false;
    } 

    for (let i = 0; i< statecopy.rombi.length; i++) {

        if (i != id) {

          statecopy.rombi[i].selected = false;


        }


    }
    statecopy.romboCliccato = id

    this.setState(statecopy);

    

  }

  selectAsset(idScenario, idAsset) {
 
    let statecopy = _.cloneDeep(this.state);

    console.log(statecopy);

    /* statecopy.setState({
        assetSelezionato: this.state.scenario[idScenario].assets[idAsset].urlImage
    }); */

    statecopy.scenario[idScenario].assets[idAsset].cliccato = true;

    if (
      statecopy.scenario[idScenario].assets[idAsset].cliccato &&
      statecopy.rombi[this.state.romboCliccato].selected
    ) {
      
      statecopy.scenario[idScenario].assets[idAsset].cliccato = false;
      statecopy.rombi[this.state.romboCliccato].assetUrl = statecopy.scenario[idScenario].assets[idAsset].urlImage;
    }

    this.setState(statecopy);

 
  }

  // INIZIO RENDER
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


  render() {

      console.log(this.state)
     

    let appJSX = [];

///////////////////  HOME PAGE

    if (this.state.position.page == "home") {
      appJSX = (
        <div>
          <div className ="logo">
              <img src = {require('./Logo-mindo.svg')} width = "176"/>
          </div>
          <div className = "containerPrincipale">
              <div className = "ctaContainer">
                    <button
                      onClick={this.changePage.bind(this)}
                      name="avversario"
                      type="button"
                      className="cta ctaRed ctaFirst"
                    >
                    <img src = {require('./icons/piu.svg')} className = "iconplus" width = "34,63" height = "34,63"/>
                       
                      Nuova partita
                    </button>
                    <button
                      onClick={this.changePage.bind(this)}
                      name="tutorial"
                      type="button"
                      className="cta ctaAzure"
                    >
                    <img src = {require('./icons/esclamation.svg')} className = "iconplus" width = "34,63" height = "34,63"/>
                      Tutorial
                    </button>
                </div>    
              <p className = "partite"> Partite in corso: </p>
              <p className = "noPartita"> Nessuna partita! </p>
          </div>
        </div>
      );
    } else if (this.state.position.page == "tutorial") {
    }
    
    else if (this.state.position.page == "avversario") {

      appJSX = (
        <div>
          <div className ="logo">
              <img src = {require('./Logo-mindo.svg')} width = "176"/>
          </div>
          <div className = "containerPrincipale">
            
            <p className ="sectionTitle"><i name = "home" onClick={this.changePage.bind(this)} class="fas fa-chevron-left"></i>  Nuova partita </p>
              <div className = "ctaContainer ctaAvversario">
                    
                    <button
                      onClick={this.changePage.bind(this)}
                      name="scenario"
                      type="button"
                      className="cta ctaRed ctaFirst "
                    >
                    
                    <i class="fas fa-random"></i>
                     Avversario casuale
                    </button>
                    <button
                      onClick={this.changePage.bind(this)}
                      name="scenario"
                      type="button"
                      className="cta ctaRed "
                    >
                    <i class="fab fa-facebook-f"></i>

                      Sfida un amico
                    </button>
                </div>    
              
          </div>
        </div>
      );



    }
    
    
    
    
    else if (this.state.position.page == "scenario") {
      appJSX = (
        <div>
          <h1>Scegli scenario</h1>

          <button
            name="spiaggia"
            onClick={this.changeScenario.bind(this, "spiaggia")}
            type="button"
            className="btn btn-secondary"
          >
            Spiaggia
          </button>
          <button
            name="foresta"
            onClick={this.changeScenario.bind(this, "foresta")}
            type="button"
            className="btn btn-success"
          >
            Foresta
          </button>
          <button
            name="spazio"
            onClick={this.changeScenario.bind(this, "spazio")}
            type="button"
            className="btn btn-danger"
          >
            Spazio
          </button>
        </div>
      )
    } else {
      let romboJSX = [];
      let assetsJSX = [];
      

      let scenario = _.find(this.state.scenario, {
        name: this.state.scenarioSelezionato
      });

      

      let indexScenario = this.state.scenario.findIndex(
        i => i.name === this.state.scenarioSelezionato
      );
     

      for ( let i = 0; i < this.state.scenario[indexScenario].assets.length; i++ ) {
           
          let imgAsset = this.state.scenario[indexScenario].assets[i].urlImage;

          assetsJSX.push(
            <div>
              <ul class="flex-container">
                <li class="flex-item">
                  <img
                    name={i}
                    src={imgAsset}
                    height="50"
                    width="50"
                    onClick={this.selectAsset.bind(this, indexScenario, i)}
                  />
                </li>
              </ul>{" "}
            </div>
        );
      }

      for (let i = 0; i < this.state.rombi.length; i++) {
        let rombo = this.state.rombi[i];
        

        if (rombo.assetUrl) {
          romboJSX.push(
            <img src={this.state.rombi[i].assetUrl} height="50" width="50" />
          );

          

          
          
        } else if (! rombo.assetUrl ) {
          if (rombo.selected == true) {
            romboJSX.push(
              <img
                src="https://image.ibb.co/dc0end/rombo_arancio.png"
                alt="rombo_arancio"
                border="0"
                onClick={this.selectRombo.bind(this, i)}
              />
            );
          }

          if (rombo.selected == false) {
            romboJSX.push(
              <img
                src="https://image.ibb.co/kaL4nd/rombo_blu.png"
                alt="rombo_blu"
                border="0"
                onClick={this.selectRombo.bind(this, i)}
              />
            );
          }
        }
      }

      appJSX = (
        <div>
          <h1>{scenario.name}</h1>
          <div>{romboJSX}</div>
          <div>{assetsJSX}</div>
        </div>
      );
    }

    return <div>{appJSX}</div>;
  }
}
export default App
