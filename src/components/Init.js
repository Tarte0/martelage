
import React from "react";
import {Card,Button} from "antd";


class Init extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
              <Card title="Initialisation de la base de donnée">
                  La base de données ne semble pas initialisée, voulez vous l'initialiser ?
                  <Button type="primary"
                          loading={this.props.initStart}
                          onClick={()=>{
                            this.props.initDB()
                          }} >
                      INITIALISEROKZ EIO

                  </Button>

              </Card>


            </div>
        );
    }
}

Init.propTypes = {};

export default Init;
