import {Navbar, Nav, NavItem, Button} from 'react-bootstrap';
import * as React from 'react';
import { RotatingBong } from './Components/RotatingBong';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import headerLogo from './header-logo.png';

/* <-------bottom bong images-------> */
import bong00_00 from './images/final-test-images/00_00_00_00.jpg';
import bong00_01 from './images/final-test-images/00_01_00_00.jpg';
import bong00_02 from './images/final-test-images/00_02_00_00.jpg';
import bong00_03 from './images/final-test-images/00_03_00_00.jpg';
import bong00_04 from './images/final-test-images/00_04_00_00.jpg';

/* <-------middle bong images-------> */
import bong01_00 from './images/final-test-images/01_00_00_00.jpg';
import bong01_01 from './images/final-test-images/01_01_00_00.jpg';
import bong01_02 from './images/final-test-images/01_02_00_00.jpg';
import bong01_03 from './images/final-test-images/01_03_00_00.jpg';
import bong01_04 from './images/final-test-images/01_04_00_00.jpg';

/* <-------top bong images-------> */
import bong02_00 from './images/final-test-images/02_00_00_00.jpg';
//import bong02_01 from './images/final-test-images/02_01_00_00.jpg';
import bong02_02 from './images/final-test-images/02_02_00_00.jpg';
import bong02_03 from './images/final-test-images/02_03_00_00.jpg';
import bong02_04 from './images/final-test-images/02_04_00_00.jpg';

//declare var circlr: any;
interface AppProps {

}
interface AppState {
    activeID: number,
    topLookUp: [number, any][],
    middleLookUp: [number, any][],
    bottomLookUp: [number, any][],
    fourthLookUp: [number, any][],
    fifthLookUp: [number, any][],

    totalCost: number,
    selectedTop: number,
    selectedMid: number,
    selectedBot: number,
    selected4th: number,
    selected5th: number,
    selectedTopPrice: number,
    selectedMidPrice: number,
    selectedBotPrice: number,
    selected4thPrice: number,
    selected5thPrice: number,

    costDesc: string,
    hasFourth: boolean,
    hasFifth: boolean
}

class App extends React.Component<AppProps, AppState> {

    constructor(props) {
        super(props);

        library.add(faArrowLeft);
        library.add(faArrowRight);
        library.add(faInfoCircle);

        this.state = {
            activeID: 1,
            bottomLookUp: this.generateImageLookUp(this.bottomImagePaths),
            middleLookUp: this.generateImageLookUp(this.middleImagePaths),
            topLookUp: this.generateImageLookUp(this.topImagePaths),
            fifthLookUp: this.generateImageLookUp(this.middleImagePaths),
            fourthLookUp: this.generateImageLookUp(this.middleImagePaths),
            selectedTop: 0,
            selectedMid: 0,
            selectedBot: 0,
            selected4th: 0,
            selected5th: 0,
            selectedTopPrice: this.topImagePaths[0].price,
            selectedMidPrice: this.middleImagePaths[0].price,
            selectedBotPrice: this.bottomImagePaths[0].price,
            selected4thPrice: 0,
            selected5thPrice: 0,
            totalCost: this.topImagePaths[0].price + this.middleImagePaths[0].price + this.bottomImagePaths[0].price,
            costDesc: "",
            hasFourth: false,
            hasFifth: false
        };
    }

    private bongImages = document.querySelector('.image-container');
    private nextButton: HTMLButtonElement;
    private previousButton: HTMLButtonElement;
    private playButton: HTMLButtonElement;

    private bottomImagePaths: any[] =
    [
        { pic: bong00_00, price: 20 },
        { pic: bong00_01, price: 25 },
        { pic: bong00_02, price: 40 },
        { pic: bong00_03, price: 55 },
        { pic: bong00_04, price: 30 }
    ];

    private middleImagePaths: any[] =
    [
        { pic: bong01_00, price: 20 },
        { pic: bong01_01, price: 40 },
        { pic: bong01_02, price: 55 },
        { pic: bong01_03, price: 55 },
        { pic: bong01_04, price: 45 }
    ];

    private topImagePaths: any[] =
    [
        { pic: bong02_00, price: 25 },
        { pic: bong02_02, price: 30 },
        { pic: bong02_03, price: 25 },
        { pic: bong02_04, price: 40 }
    ];

    componentDidMount() {
        this.setState({
            bottomLookUp: this.generateImageLookUp(this.bottomImagePaths),
            middleLookUp: this.generateImageLookUp(this.middleImagePaths),
            topLookUp: this.generateImageLookUp(this.topImagePaths),
            fifthLookUp: this.generateImageLookUp(this.middleImagePaths),
            fourthLookUp: this.generateImageLookUp(this.middleImagePaths),
            totalCost: this.calculateTotalCost(),
            costDesc: this.createCostDesc()
        });
    }

    toggleActive = (newActiveID: number) => {
        this.setState({
            activeID: newActiveID
        });
    };

    generateImageLookUp(imagePaths: any[]): [number, string][] {
        let returnValues: [number, any][] = [];
        return imagePaths.map((image, index) => returnValues[index] = [index, image])
    };

    changeTop(isNext: boolean) {
        var newIndex = this.findTopIndex(this.state.selectedTop, isNext);
        this.setState({
            selectedTop: newIndex,
            selectedTopPrice: this.topImagePaths[newIndex].price,
            totalCost: this.calculateTotalCost(),
            costDesc: this.createCostDesc()
        });
    }

    changeMid(isNext: boolean) {
        var newIndex = this.findMidIndex(this.state.selectedMid, isNext);
        this.setState({
            selectedMid: newIndex,
            selectedMidPrice: this.middleImagePaths[newIndex].price,
            totalCost: this.calculateTotalCost(),
            costDesc: this.createCostDesc()
        });
    }

    changeBot(isNext: boolean) {
        var newIndex = this.findBotIndex(this.state.selectedBot, isNext);
        this.setState({
            selectedBot: newIndex,
            selectedBotPrice: this.bottomImagePaths[newIndex].price,
            totalCost: this.calculateTotalCost(),
            costDesc: this.createCostDesc()
        });
    }

    change4th(isNext: boolean) {
        var newIndex = this.find4thIndex(this.state.selected4th, isNext);
        this.setState({
            selected4th: newIndex,
            selected4thPrice: this.middleImagePaths[newIndex].price,
            totalCost: this.calculateTotalCost(),
            costDesc: this.createCostDesc()
        });
    }

    find4thIndex(currentSelected: number, isNext: boolean): number {
        let numberOfMids = this.state.fourthLookUp.length -1;
        if (isNext) {
            if (numberOfMids == currentSelected) {
                return 0;
            } else {
                return currentSelected + 1;
            }
        } else {
            if (currentSelected == 0) {
                return numberOfMids;
            } else {
                return currentSelected - 1;
            }
        }
    }

    change5th(isNext: boolean) {
        var newIndex = this.find5thIndex(this.state.selected5th, isNext);
        this.setState({
            selected5th: newIndex,
            selected5thPrice: this.middleImagePaths[newIndex].price,
            totalCost: this.calculateTotalCost(),
            costDesc: this.createCostDesc()
        });
    }

    find5thIndex(currentSelected: number, isNext: boolean): number {
        let numberOfMids = this.state.fifthLookUp.length -1;
        if (isNext) {
            if (numberOfMids == currentSelected) {
                return 0;
            } else {
                return currentSelected + 1;
            }
        } else {
            if (currentSelected == 0) {
                return numberOfMids;
            } else {
                return currentSelected - 1;
            }
        }
    }

    findMidIndex(currentSelected: number, isNext: boolean): number {
        let numberOfMids = this.state.middleLookUp.length -1;
        if (isNext) {
            if (numberOfMids == currentSelected) {
                return 0;
            } else {
                return currentSelected + 1;
            }
        } else {
            if (currentSelected == 0) {
                return numberOfMids;
            } else {
                return currentSelected - 1;
            }
        }
    }

    findTopIndex(currentSelected: number, isNext: boolean): number {
        let numberOfTops = this.state.topLookUp.length -1;
        if (isNext) {
            if (numberOfTops == currentSelected) {
                return 0;
            } else {
                return currentSelected + 1;
            }
        } else {
            if (currentSelected == 0) {
                return numberOfTops;
            } else {
                return currentSelected - 1;
            }
        }
    }

    findBotIndex(currentSelected: number, isNext: boolean): number {
        let numberOfBots = this.state.bottomLookUp.length -1;
        if (isNext) {
            if (numberOfBots == currentSelected) {
                return 0;
            } else {
                return currentSelected + 1;
            }
        } else {
            if (currentSelected == 0) {
                return numberOfBots;
            } else {
                return currentSelected - 1;
            }
        }
    }

    calculateTotalCost(): number {
        var totalCost = this.state.selectedMidPrice + this.state.selectedBotPrice + this.state.selectedTopPrice;

        if (this.state.hasFourth){
            totalCost += this.state.selected4thPrice;
        }
        if (this.state.hasFifth){
            totalCost += this.state.selected5thPrice
        }

        return totalCost;
    }

    createCostDesc(): string {
        var cost =
            ["Top piece cost: $" + this.state.selectedTopPrice.toString() + ".",
             "Middle piece cost: $" + this.state.selectedMidPrice.toString() + ".",
             "Bottom piece cost: $" + this.state.selectedBotPrice.toString() + "."];

        var totalCost = this.state.selectedTopPrice + this.state.selectedMidPrice + this.state.selectedBotPrice;

        if(this.state.hasFourth){
            cost.push("1st upgrade piece cost: $" + this.state.selected4thPrice.toString() + ".");
            totalCost += this.state.selected4thPrice;
        }
        if (this.state.hasFifth){
            cost.push("2nd upgrade piece cost: $" + this.state.selected5thPrice.toString() + ".");
            totalCost += this.state.selected5thPrice;
        }

        cost.push("For a total cost of: $" + totalCost.toString());

        return cost.join('\n');
    }

    // todo: need to add possiblity to add new sections + detail about what section does below creation...

    // todo: need to add bowl to bong creation / selection page


    purchaseBong(){
        // todo: make API call to backend & send $$ CUSTOMER $$ to purchase page....


    }

    upgradeBongClick(){
        if(!this.state.hasFourth) {
            this.setState({
                hasFourth: true,
                selected4thPrice: this.middleImagePaths[this.state.selected4th].price,
                totalCost: this.calculateTotalCost()
            })

        } else if(!this.state.hasFifth){
            this.setState({
                hasFifth: true,
                selected5thPrice: this.middleImagePaths[this.state.selected5th].price,
                totalCost: this.calculateTotalCost()
            });
        }


    }

    downgradeBongClick(){
        if(this.state.hasFifth) {
            this.setState({
                hasFifth: false,
                totalCost: this.calculateTotalCost()
            })

        } else if(this.state.hasFourth){
            this.setState({
                hasFourth: false,
                totalCost: this.calculateTotalCost()
            });
        }
    }


  public render() {
      /* tslint:disable */
    return (
        <div>
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#home">
                            <img src={headerLogo} className="app-header-logo" alt="logo" height={29}/>
                        </a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <NavItem eventKey={1} href="#" className={"menu-item"}>
                        Products
                    </NavItem>
                    <NavItem eventKey={1} href="#" className={"menu-item"}>
                        About
                    </NavItem>
                    <NavItem eventKey={1} href="#" className={"menu-item"}>
                        Share
                    </NavItem>
                    <div className={"build-button"}>
                    <NavItem eventKey={2} href="#" >
                        <Button bsStyle="warning" color={"white"}> Share your creation</Button>
                    </NavItem>
                    </div>
                </Nav>
            </Navbar>

            <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-12 scroll-drew">
                <div className="drewfis-container">
                    <div className={"bong-image-holder"}>
                        <img src={this.topImagePaths[this.state.selectedTop].pic} className={"bong-image"}/>

                    <i aria-hidden="true" onClick={() => this.changeTop(true)} className={"nextCircle top15"}>
                        <FontAwesomeIcon icon="arrow-right" className={"next"}/>
                    </i>

                    <i aria-hidden="true" onClick={() => this.changeTop(false)} className={"prevCircle top15"}>
                        <FontAwesomeIcon icon="arrow-left" className={"previous"}/>
                    </i>
                    </div>
                </div>

                <div className="drewfis-container">
                    <div className={"bong-image-holder"}>
                        <img src={this.middleImagePaths[this.state.selectedMid].pic} className={"bong-image"}/>

                        <i aria-hidden="true" onClick={() => this.changeMid(true)} className={this.state.hasFourth ? "nextCircle has4th" : "nextCircle top39"}>
                            <FontAwesomeIcon icon="arrow-right" className={"next"}/>
                        </i>

                        <i aria-hidden="true" onClick={() => this.changeMid(false)} className={this.state.hasFourth ? "prevCircle has4th" : "prevCircle top39"}>
                            <FontAwesomeIcon icon="arrow-left" className={"previous"}/>
                        </i>
                    </div>
                </div>

                {this.state.hasFourth &&
                    <div className="drewfis-container">
                        <div className={"bong-image-holder"}>
                            <img src={this.middleImagePaths[this.state.selected4th].pic} className={"bong-image"}/>

                            <i aria-hidden="true" onClick={() => this.change4th(true)} className={"nextCircle top50"}>
                                <FontAwesomeIcon icon="arrow-right" className={"next"}/>
                            </i>

                            <i aria-hidden="true" onClick={() => this.change4th(false)} className={"prevCircle top50"}>
                                <FontAwesomeIcon icon="arrow-left" className={"previous"}/>
                            </i>
                        </div>
                    </div>
                }

                {this.state.hasFifth &&
                    <div className="drewfis-container">
                        <div className={"bong-image-holder"}>
                            <img src={this.middleImagePaths[this.state.selected5th].pic} className={"bong-image"}/>

                            <i aria-hidden="true" onClick={() => this.change5th(true)} className={"nextCircle top30"}>
                                <FontAwesomeIcon icon="arrow-right" className={"next"}/>
                            </i>

                            <i aria-hidden="true" onClick={() => this.change5th(false)} className={"prevCircle top30"}>
                                <FontAwesomeIcon icon="arrow-left" className={"previous"}/>
                            </i>
                        </div>
                    </div>
                }

                <div
                    className={"drewfis-container"}>
                    <div className={"bong-image-holder"}>
                        <img src={this.bottomImagePaths[this.state.selectedBot].pic} className={"bong-image"}/>

                        <i aria-hidden="true" onClick={() => this.changeBot(true)} className={"nextCircle top615"}>
                            <FontAwesomeIcon icon="arrow-right" className={"next"}/>
                        </i>

                        <i aria-hidden="true" onClick={() => this.changeBot(false)} className={"prevCircle top615"}>
                            <FontAwesomeIcon icon="arrow-left" className={"previous"}/>
                        </i>
                    </div>
                </div>

                <Button bsStyle="primary" className={"btn-block"} style={{marginTop: "10px", marginBottom: "10px"}} onClick={() => this.upgradeBongClick()}>Upgrade</Button>
                <Button bsStyle="success" className={"btn-block"} style={{marginTop: "10px", marginBottom: "10px"}} onClick={() => null}>Purchase</Button>

                {(this.state.hasFourth || this.state.hasFifth) &&
                    <Button bsStyle="danger" className={"btn-block"} style={{marginTop: "10px", marginBottom: "10px"}}
                            onClick={() => this.downgradeBongClick()}>Downgrade</Button>
                }

                <p className={"costText"}> Total cost as built: ${this.state.totalCost} <FontAwesomeIcon icon="info-circle" className={"hvr-grow"}/> </p>
                <p>{this.state.costDesc}</p>

            </div>
        </div>

    );
  }
}

export default App;
