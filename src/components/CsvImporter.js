// @flow
import React from "react";
import * as d3 from "d3";
import {Card, Icon, Col, Row, Progress, Button, Menu, Dropdown, Form, Alert, Table, message, notification} from "antd";
import "../style/csvRows.css";

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
            uploaded: false,
            dataList: []
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
            let problem = "";
            if (d.hasOwnProperty("numero") && d.hasOwnProperty("essence") && d.hasOwnProperty("diametre")
                && d.hasOwnProperty("etat") && d.hasOwnProperty("x") && d.hasOwnProperty("y")
                && d.hasOwnProperty("note_ecologique") && d.hasOwnProperty("bois_oeuvre")
            &&d.hasOwnProperty("bois_chauffage") && d.hasOwnProperty("bois_industrie")) { //csv line has all the required colums

                if (d.numero !== "" && parseInt(d.diametre) > 0 && parseFloat(d.x) >= 0.0
                    && parseFloat(d.y) >= 0.0 && parseInt(d.note_ecologique) >= 0
                    && etats.indexOf(d.etat.toLowerCase()) >= 0 && essences.indexOf(d.essence.toLowerCase()) >= 0) {

                    return {...d, line: line, type: "valide", problem: "Aucune"}; //csv line has been computed has a valid new tree (conflicts are handled on filling)
                }

                if (d.numero == "") {
                    problem = "Numero vide"
                }

                if (parseInt(d.diametre) <= 0) {
                    problem = `Diametre <= 0 (actuel: ${d.diametre})`;
                }

                if (parseFloat(d.x) < 0.0) {
                    problem = `Coordonnée x < 0.0 (actuel: ${d.x})`;
                }

                if (parseFloat(d.y) < 0.0) {
                    problem = `Coordonnée y < 0.0 (actuel: ${d.y})`;
                }

                if (parseInt(d.note_ecologique) < 0) {
                    problem = `Note écologique < 0 (actuelle: ${d.diametre})`;
                }

                if (etats.indexOf(d.etat.toLowerCase()) <= 0) {
                    problem = `Etat inconnu (actuel: ${d.etat})`;
                }

                if (essences.indexOf(d.essence.toLowerCase()) <= 0) {
                    problem = `Essence inconnue (actuelle: ${d.essence})`;
                }
            }else{
               problem = "Colonnes invalides";
            }

            let errors = this.state.csvErrors.slice();
            errors.push({...d, line: line, type: "erreur", problem: problem});
            this.setState({csvErrors: errors});
            //csv line has been computed has an error

            return null;
        };

        const
            parseFile = () => {

                let line = 1;
                let csvData = d3.csvParse(reader.result, function (d) {
                    return handleCsvLine(d, ++line);
                });
                console.log(csvData);
                let percent = 100;
                let progressStatus = "success";
                this.setState({percent, progressStatus, csvData});
            };

        const
            parcelsDropDown = (
                <Menu onClick={(e) => {
                    this.setState({parcelId: e.key, parcelName: this.props.parcels.find(p => p.id === e.key).nom});
                    this.props.selectParcel(e.key);
                    this.setState({csvConflicts: []});

                }}>
                    {this.props.parcels.map(p => (<Menu.Item key={p.id}>{p.nom}</Menu.Item>))}
                </Menu>
            );

        const
            printErrors = () => {
                let errorsStr = "";
                for (let i = 0; i < this.state.csvErrors.length; i++) {
                    errorsStr += ` - ${this.state.csvErrors[i].line}`;
                }
                return errorsStr;
            };


        const
            renderAlerts = () => {
                if (!this.state.uploaded)
                    return;
                return (
                    <Col span={10} offset={2}>
                        <div>
                            <Row>
                                <Alert
                                    message="Valides"
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
                                    description={`${this.state.csvErrors.length} ligne${this.state.csvErrors.length > 1 ? 's' : ''} non traitée${this.state.csvErrors.length > 1 ? 's' : ''} : \n${printErrors()}`}
                                    type="error"
                                    showIcon
                                />
                            </Row>
                        </div>
                    </Col>  )
            };

        const
            renderList = () => {
                this.state.dataList = Object.values(this.state.csvData).concat(this.state.csvConflicts.concat(this.state.csvErrors));
                if (!this.state.uploaded || this.state.dataList.length <= 0)
                    return;
                return (
                    <Table dataSource={this.state.dataList}
                           title={() => "Erreurs à traiter"}
                           bordered={true}
                           rowClassName={(record, index) => record.type === "erreur" ? 'errorRow' : record.type === "conflit" ? 'conflictRow' : 'goodRow' }
                           locale={{
                               emptyText: 'Aucunes lignes',
                               filterTitle: 'Filtre',
                               filterConfirm: 'Ok',
                               filterReset: 'Reset',
                           }}
                           columns={
                               [
                                   {
                                       title: "ligne CSV",
                                       key: 'line',
                                       dataIndex: 'line',
                                       sorter: (a, b) => a.line - b.line
                                   },
                                   {
                                       title: "numero arbre",
                                       key: 'numero',
                                       dataIndex: 'numero',
                                       sorter: (a, b) => a.numero.localeCompare(b.numero)
                                   },
                                   {
                                       title: "type de la ligne CSV",
                                       key: 'type',
                                       dataIndex: 'type',
                                       sorter: (a, b) => a.type.localeCompare(b.type),
                                       filters: [
                                           {text: "erreur", value: "erreur"},
                                           {text: "conflit", value: "conflit"},
                                           {text: "valide", value: "valide"},
                                       ],
                                       onFilter: (value, record) => record.type === value,
                                       filterMultiple: true
                                   },
                                   {
                                       title: "source de l'erreur",
                                       key: 'problem',
                                       dataIndex: 'problem',
                                       sorter: (a, b) => a.problem.localeCompare(b.problem),
                                   },
                               ]
                           }/>);
            };

        const notify = () => {
                 if(this.state.csvErrors.length>0 || this.state.csvConflicts.length>0){
                     notification.open({
                         message: 'Fichier CSV non conforme',
                         description: "Les problèmes sont visibles à l'aide de la liste ci dessous",

                         icon: <Icon type="close-circle" style={{ color: '#f04134' }} />,
                         placement:"topLeft",
                         duration: 0
                     });
                 }else{
                     notification.open({
                         message: 'Fichier CSV importé !',
                         description: "La base de donnée a été remplie",

                         icon: <Icon type="check-circle" style={{ color: '#00a854' }} />,
                         placement:"topLeft",
                         duration: 0
                     });
                 }
        };


        const
            fillParcelCsv = () => {
                //check if the tree create a conflict,
                //meaning that a different tree with the same "numero" exists in our data

                //regroup all the "numero" provided by our parcel trees
                const parcelTreeNumbers = this.props.selectedTrees.map(t => {
                    return ""+t.numero;
                });

                let conflicts = this.state.csvConflicts.slice();
                let valid = [];
                //check all the valid trees to find conflicted data
                const mappedCsvData = this.state.csvData.map(t => {
                    if (parcelTreeNumbers.indexOf(t.numero) >= 0) { //found a conflict
                        conflicts.push({...t, type: "conflit", problem:"Numéro déja présent"});
                    } else { //valid tree
                        valid.push(t);
                    }
                });
                this.setState({csvConflicts: conflicts});
                this.setState({csvData: valid});
                this.setState({uploaded: true});
                if(this.state.csvErrors.length<=0 && conflicts.length<=0){
                    const treesToAdd = this.state.csvData.slice();
                    let tree;
                    for(let i=0; i<treesToAdd.length; i++){
                        tree = { //we create a tree from the csv line
                            parcelId: this.state.parcelId,
                            numero: treesToAdd[i].numero,
                            essence: treesToAdd[i].essence.toLowerCase(),
                            diametre: parseInt(treesToAdd[i].diametre),
                            etat: treesToAdd[i].etat.toLowerCase(),
                            coord: {x: parseFloat(treesToAdd[i].x.replace(',', '.')), y: parseFloat(treesToAdd[i].y.replace(',', '.'))},
                            noteEcologique: parseInt(treesToAdd[i].note_ecologique),
                            utilisationBois: {
                                oeuvre: parseFloat(treesToAdd[i].bois_oeuvre===""?0:treesToAdd[i].bois_oeuvre),
                                chauffage: parseFloat(treesToAdd[i].bois_chauffage===""?0:treesToAdd[i].bois_chauffage),
                                industrie: parseFloat(treesToAdd[i].bois_industrie===""?0:treesToAdd[i].bois_industrie)
                            }
                        };
                        this.props.addTree(tree);
                    }
                }
                notify();
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
                                    <Button style={{marginLeft: 8}}>
                                        {this.state.parcelName} <Icon type="down"/>
                                    </Button>
                                </Dropdown>
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    size="large"
                                    disabled={!this.state.parcelName || this.state.progressStatus !== "success" || this.state.uploaded}
                                    onClick={() => {
                                        fillParcelCsv()
                                    }}>Traiter le CSV</Button>
                            </Form.Item>
                        </Form>
                    </Col>
                    {renderAlerts()}
                </Row>
                <Row>
                    {renderList()}
                </Row>
            </Card>
        )
            ;
    }
}

CsvImporter.propTypes = {};

export default CsvImporter;
