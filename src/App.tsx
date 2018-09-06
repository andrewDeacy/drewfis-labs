import {Navbar, Nav, NavItem, Button} from 'react-bootstrap';
import * as React from 'react';
import { RotatingBong } from './Components/RotatingBong';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
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
import bong02_01 from './images/final-test-images/02_01_00_00.jpg';
import bong02_02 from './images/final-test-images/02_02_00_00.jpg';
import bong02_03 from './images/final-test-images/02_03_00_00.jpg';
import bong02_04 from './images/final-test-images/02_04_00_00.jpg';

//declare var circlr: any;
interface AppProps {
    //onWindowScroll: () => void;

}
interface AppState {
    activeID: number,
    topLookUp: [number, any][],
    middleLookUp: [number, any][],
    bottomLookUp: [number, any][]

}

class App extends React.Component<AppProps, AppState> {

    constructor(props) {
        super(props);

        // add font awesome icons
        library.add(faArrowLeft);
        library.add(faArrowRight);

        this.state = {
            activeID: 1,
            bottomLookUp: this.generateImageLookUp(this.bottomImagePaths),
            middleLookUp: this.generateImageLookUp(this.middleImagePaths),
            topLookUp: this.generateImageLookUp(this.topImagePaths)
        };
    }

    private bongImages = document.querySelector('.image-container');
    private nextButton: HTMLButtonElement;
    private previousButton: HTMLButtonElement;
    private playButton: HTMLButtonElement;

    private bottomImagePaths: any[] =
    [
        bong00_00,
        bong00_01,
        bong00_02,
        bong00_03,
        bong00_04
    ];

    private middleImagePaths: any[] =
        [
            bong01_00,
            bong01_01,
            bong01_02,
            bong01_03,
            bong01_04
        ];

    private topImagePaths: any[] =
        [
            bong02_00,
            bong02_01,
            bong02_02,
            bong02_03,
            bong02_04
        ];

    componentDidMount() {
/*
        if(this.props.onWindowScroll){
*/
        //let delayScroll = this.debounce(() => this.handleScroll, 250, false);

        //window.addEventListener("scroll", delayScroll);
        //}



        //window.addEventListener('scroll', this.handleScroll, { passive: true })

        this.setState({
            bottomLookUp: this.generateImageLookUp(this.bottomImagePaths),
            middleLookUp: this.generateImageLookUp(this.middleImagePaths),
            topLookUp: this.generateImageLookUp(this.topImagePaths)
        });
    }

    componentWillUnmount() {
        //if (this.props.onWindowScroll)
        //let delayScroll = this.debounce(() => this.handleScroll, 250, false);

        //window.removeEventListener("scroll", delayScroll);
    }

    handleScroll = (e) => {
        //console.log(e);

        // Do something generic, if you have to
        //console.log("ScrollWrapper's handleScroll");

        // Call the passed-in prop
        //if (this.props.onWindowScroll) this.props.onWindowScroll(event);
        //this.handleNextClick();
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


  public render() {

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
                        Contact
                    </NavItem>
                    <div className={"build-button"}>
                    <NavItem eventKey={2} href="#" >
                        <Button bsStyle="warning" color={"black"}> <b style={{"color":"black"}}>Build your own bong</b></Button>
                    </NavItem>
                    </div>
                </Nav>
            </Navbar>

            <RotatingBong
                bottomBongLookUp={this.state.bottomLookUp}
                middleBongLookUp={this.state.middleLookUp}
                topBongLookUp={this.state.topLookUp}
            />
        </div>

    );
  }
}

export default App;
