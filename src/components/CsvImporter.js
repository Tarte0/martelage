// @flow
import React from "react";
import * as d3 from "d3";
import {Card, Icon, Col, Row, Progress, Button, Menu, Dropdown, Form, Alert} from "antd";

class CsvImporter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            percent: 0,
            progressStatus: "normal",
            parcelName: "",
            parcelId: "",
            csvData: {},
            csvErrors: [],
            csvConflicts: [],
            uploaded: false
        };

    }


    render() {
        const etats = this.props.etats.map(p => (p.etat));
        const essences = this.props.essences.map(p => (p.essence));

        let reader = new FileReader();

        const loadFile = () => {
            let file = document.querySelector('input[type=file]').files[0];
            reader.addEventListener("load", parseFile, false);
            let percent = 0;
            let progressStatus = "normal";
            this.setState({percent, progressStatus});
            this.setState({csvErrors: []});
            this.setState({csvConflicts: []});
            this.setState({uploaded: false});
            if (file) {
                const extension = file.name.replace(/^.*\./, '');
                if (extension === 'csv') {
                    reader.readAsText(file);
                } else {
                    percent = 100;
                    const progressStatus = "exception";
                    this.setState({percent, progressStatus});
                }
            }
        };

        const handleCsvLine = (d, line) => {
            if (d.hasOwnProperty("numero") && d.hasOwnProperty("essence") && d.hasOwnProperty("diametre")
                && d.hasOwnProperty("etat") && d.hasOwnProperty("x") && d.hasOwnProperty("y")
                && d.hasOwnProperty("note_ecologique")) { //csv line has all the required colums
                if (d.numero !== "" && parseInt(d.diametre) > 0 && parseFloat(d.x) >= 0.0
                    && parseFloat(d.y) >= 0.0 && parseInt(d.note_ecologique) >= 0
                    && etats.indexOf(d.etat.toLowerCase()) >= 0 && essences.indexOf(d.essence.toLowerCase()) >= 0) {

                    return d; //csv line has been computed has a valid new tree (conflicts are handled on filling)
                }
            }
            //csv line has been computed has an error
            let errors = this.state.csvErrors.slice();
            errors.push({...d, line: line});
            this.setState({csvErrors: errors});
            return null;
        };

        const parseFile = () => {

            let line = 1;
            let csvData = d3.csvParse(reader.result, function (d) {
                return handleCsvLine(d, ++line);
            });
            let percent = 100;
            let progressStatus = "success";
            this.setState({percent, progressStatus, csvData});
        };

        const parcelsDropDown = (
            <Menu onClick={(e) => {
                this.setState({parcelId: e.key, parcelName: this.props.parcels.find(p => p.id === e.key).nom});
                this.props.selectParcel(e.key);
                this.setState({csvConflicts: []});

            }}>
                {this.props.parcels.map(p => (<Menu.Item key={p.id}>{p.nom}</Menu.Item>))}
            </Menu>
        );

        const printErrors = () => {
            let errorsStr = "";
            for(let i=0; i<this.state.csvErrors.length && i<10; i++){
                errorsStr += ` - ${this.state.csvErrors[i].line}`;
            }
            return errorsStr;
        };



        const renderAlerts = () => {
            if(!this.state.uploaded)
                return;
            return (
            <Col span={10} offset={2}>
                <div>
                    <Row>
                        <Alert
                            message="Parcelle remplie !"
                            description={`${this.state.csvData.length} arbres valides.`}
                            type="success"
                            showIcon
                        />
                    </Row>
                    <Row>
                        <Alert
                            message="Conflits"
                            description={`${this.state.csvConflicts.length} arbres en conflit.`}
                            type="warning"
                            showIcon
                        />
                    </Row>
                    <Row>
                        <Alert
                            message="Erreurs"
                            description={`${this.state.csvErrors.length} ligne${this.state.csvErrors.length>1?'s':''} non traitée${this.state.csvErrors.length>1?'s':''} : \n${printErrors()}`}
                            type="error"
                            showIcon
                        />
                    </Row>
                </div>
            </Col>  )
        };

        const renderFiller = () => {
           /* if(!this.state.uploaded)
                return;
            return (
                <Col span={10}>
                    <Form>
                        <Form.Item>
                            <Button
                                type="primary"
                                size="large"
                                disabled={!this.state.uploaded}
                                onClick={() => {
                                }}>Remplir la parcelle</Button>
                        </Form.Item>
                    </Form>

                </Col>
            );*/
        };

        const fillParcelCsv = () => {
            //check if the tree create a conflict,
            //meaning that a different tree with the same "numero" exists in our data

            //regroup all the "numero" provided by our parcel trees
            const parcelTreeNumbers = this.props.selectedTrees.map(t => {
                return t.numero;
            });

            let conflicts = this.state.csvConflicts.slice();
            let valid = [];
            //check all the valid trees to find conflicted data
            const mappedCsvData = this.state.csvData.map(t => {
                if(parcelTreeNumbers.indexOf(t.numero) >= 0){ //found a conflict
                    conflicts.push(t);
                }else{ //valid tree
                    valid.push(t);
                }
            });
            this.setState({csvConflicts: conflicts});
            this.setState({csvData: valid});
            this.setState({uploaded : true});

        };

        return (

            <Card>
                <Row>
                    <Col span={10}>
                        <Form>
                            <Form.Item label="fichier CSV">
                                <input type="file" onChange={loadFile}/>
                            </Form.Item>
                            <Form.Item>
                                <Progress status={this.state.progressStatus} percent={this.state.percent}/>
                            </Form.Item>
                            <Form.Item label="Parcelle dans laquelle importer les arbres">
                                <Dropdown disabled={this.state.uploaded} overlay={parcelsDropDown}>
                                    <Button  style={{marginLeft: 8}}>
                                        {this.state.parcelName} <Icon type="down"/>
                                    </Button>
                                </Dropdown>
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    size="large"
                                    disabled={!this.state.parcelName || this.state.progressStatus !== "success" || this.state.uploaded}
                                    onClick={() => {fillParcelCsv()
                                    }}>Traiter le CSV</Button>
                            </Form.Item>
                        </Form>
                    </Col>
                    {renderAlerts()}
                </Row>
                <Row>
                    {renderFiller()}
                </Row>
            </Card>
        )
            ;
    }
}

CsvImporter.propTypes = {};

export default CsvImporter;
