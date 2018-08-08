import {Navbar, Nav, NavItem, Button} from 'react-bootstrap';
import * as React from 'react';
import { RotatingBong } from './Components/RotatingBong';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import headerLogo from './header-logo.png';
import camera0 from './images/00.jpg';
import camera1 from './images/01.jpg';
import camera2 from './images/02.jpg';
import camera3 from './images/03.jpg';
import camera4 from './images/04.jpg';
import camera5 from './images/05.jpg';
import camera6 from './images/06.jpg';
import camera7 from './images/07.jpg';
import camera8 from './images/08.jpg';
import camera9 from './images/09.jpg';
import camera10 from './images/10.jpg';
import camera11 from './images/11.jpg';
/*
import camera12 from './images/12.jpg';
import camera13 from './images/13.jpg';
import camera14 from './images/14.jpg';
import camera15 from './images/15.jpg';
*/

//declare var circlr: any;
interface AppProps {
    //onWindowScroll: () => void;

}
interface AppState {
    activeID: number,
    lookUp: [number, any][]
}

class App extends React.Component<AppProps, AppState> {

    constructor(props) {
        super(props);

        // add font awesome icons
        library.add(faArrowLeft);
        library.add(faArrowRight);

        this.state = {
            activeID: 1,
            lookUp: this.generateImageLookUp(this.imagePaths)
        };
    }

    private bongImages = document.querySelector('.image-container');
    private nextButton: HTMLButtonElement;
    private previousButton: HTMLButtonElement;
    private playButton: HTMLButtonElement;

    private imagePaths: any[] =
    [
        camera0,
        camera1,
        camera2,
        camera3,
        camera4,
        camera5,
        camera6,
        camera7,
        camera8,
        camera9,
        camera10,
        camera11,
/*        camera12,
        camera13,
        camera14,
        camera15*/
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
            lookUp: this.generateImageLookUp(this.imagePaths)
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
                        <Button bsStyle="warning" color={"black"}> <b style={{"color":"black"}}>Build your own</b></Button>
                    </NavItem>
                    </div>
                </Nav>
            </Navbar>


            <RotatingBong bongImagePathIDLookUp={this.state.lookUp}/>
        </div>

    );
  }
}

//declare var circlr: any;


export default App;
