// @flow
import React from "react";
import {Card, Col, Row} from "antd";
class TreeView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        const hauteurDecoupe = this.props.tree.diametre <= 30 ? this.props.constants.getIn(['hauteurMoyenne', 'petitBois']) : this.props.constants.getIn(['hauteurMoyenne', this.props.essences.get(this.props.tree.essence.toLowerCase())]);
        let volumeCommercial = 0;
        if (this.props.tree.etat === 'v') {
            volumeCommercial = (this.props.constants.getIn(['volume', 'commercial', this.props.essences.get(this.props.tree.essence.toLowerCase())]) * Math.pow(this.props.tree.diametre / 100, 2) * hauteurDecoupe).toFixed(2);
        }
        const volumeComBois = {
            oeuvre: volumeCommercial * this.props.tree.utilisationBois.oeuvre/100,
            industrie: volumeCommercial * this.props.tree.utilisationBois.industrie/100,
            chauffage: volumeCommercial * this.props.tree.utilisationBois.chauffage/100
        };
        const prixBoisOeuvre = this.props.constants.getIn(['prix', 'bois', 'oeuvre', this.props.tree.essence.toLowerCase()]);
        const prixBoisIndustrie = this.props.constants.getIn(['prix', 'bois', 'industrie', this.props.tree.essence.toLowerCase()]);
        const prixBoisChauffage = this.props.constants.getIn(['prix', 'bois', 'chauffage', this.props.tree.essence.toLowerCase()]);

        const prixBois = {
            oeuvre: prixBoisOeuvre === undefined ? this.props.constants.getIn(['prix', 'bois', 'oeuvre', this.props.essences.get(this.props.tree.essence.toLowerCase())]) : prixBoisOeuvre,
            industrie: prixBoisIndustrie === undefined ? this.props.constants.getIn(['prix', 'bois', 'industrie', this.props.essences.get(this.props.tree.essence.toLowerCase())]) : prixBoisIndustrie,
            chauffage: prixBoisChauffage === undefined ? this.props.constants.getIn(['prix', 'bois', 'chauffage', this.props.essences.get(this.props.tree.essence.toLowerCase())]) : prixBoisChauffage,

        };
        const valeurEcoBois = {
            oeuvre: volumeComBois.oeuvre * prixBois.oeuvre,
            industrie: volumeComBois.industrie * prixBois.industrie,
            chauffage: volumeComBois.chauffage * prixBois.chauffage
        };
        const valeurEconomique = valeurEcoBois.oeuvre + valeurEcoBois.industrie + valeurEcoBois.chauffage;
        console.log(volumeComBois);
        console.log(prixBois);
        console.log(valeurEcoBois);
        return (
            <div>
                <Card>
                    <div>
                        <Row>
                            <Col span={8}>
                                <p>Hauteur découpe : {hauteurDecoupe} m</p>
                            </Col>
                            <Col span={8}>
                                <p>Volume commercial : {volumeCommercial} m3</p>
                            </Col>
                            <Col span={8}>
                                <p>valeur économique : {valeurEconomique.toFixed(2)} €</p>
                            </Col>
                        </Row>{
                        /*<Row>
                            <Col span={12}>
                                <p>Volume commercial oeuvre : {this.props.tree.utilisationBois.oeuvre} m3</p>
                                <p>Volume commercial industrie : {this.props.tree.utilisationBois.industrie} m3</p>
                                <p>Volume commercial chauffage : {this.props.tree.utilisationBois.chauffage} m3</p>
                            </Col>
                            <Col span={12}>
                                <p>valeur économique oeuvre : {this.props.tree.utilisationBois.oeuvre} m3</p>
                                <p>valeur économique industrie : {this.props.tree.utilisationBois.industrie} m3</p>
                                <p>valeur économique chauffage : {this.props.tree.utilisationBois.chauffage} m3</p>
                            </Col>
                        </Row>*/}
                    </div>
                </Card>
            </div>
        );
    }
}

TreeView.propTypes = {};

export default TreeView;
