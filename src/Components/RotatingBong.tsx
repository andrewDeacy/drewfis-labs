import * as React from 'react';
import {circlr} from 'circlr';
import {Button} from 'react-bootstrap';

import ScrollTrigger from 'react-scroll-trigger';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {setInterval} from "timers";

interface RotatingBongProps {
    bongImagePathIDLookUp: [number, string][];
}
interface RotatingBongState {
    activeBongID: number,
    bongImages: [number, string][];
}

export class RotatingBong extends React.Component<RotatingBongProps, RotatingBongState> {

    constructor(props) {
        super(props);
        //this.handleScroll = this.handleScroll.bind(this);
        this.state = {
            activeBongID: 1,
            bongImages: this.props.bongImagePathIDLookUp
        };
    }

    private scrollDiv: HTMLElement;

    componentDidMount() {
        //window.addEventListener('scroll', this.handleScroll);
        if (this.scrollDiv)
            this.scrollDiv.addEventListener('scroll', ()=> this.handleScroll);

        this.setState({
            bongImages: this.props.bongImagePathIDLookUp,
            activeBongID: 0
        });
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            bongImages: nextProps.bongImagePathIDLookUp
        });
    }

    handleScroll = (e) => {
        console.log('scroll event');
        console.log(e);
        this.handleNextClick();
    }

    handleWheel = (e) => {
        if(setTimeout(this.isWheelMovingRight(e), 500)){
            this.handleNextClick();
        } else {
            this.handlePrevClick();
        }
    }

    isWheelMovingRight = (e) => {
        let isRight = e.deltaX;

        isRight ? console.log("wheel right!!") : console.log("wheel left!!");

        return isRight;
    }



    handleTouchStart = (e) => {

    }


    componentWillMount(){
        if(this.scrollDiv)
            this.scrollDiv.removeEventListener('scroll', this.handleScroll);
    }

    toggleActive = (newActiveID: number) => {
        this.setState({
            activeBongID: newActiveID
        });
    };

    handleNextClick = () => {
        let currentActiveIndex: number = this.props.bongImagePathIDLookUp.filter(x => x[0] == this.state.activeBongID)[0][0];
        let currentActiveIndexIsLast: boolean = currentActiveIndex === (this.props.bongImagePathIDLookUp.length - 1);

        this.setState({
            activeBongID: currentActiveIndexIsLast ? 0 : (currentActiveIndex + 1)
        });
    };

    handlePrevClick = () => {
        let currentActiveIndex: number = this.props.bongImagePathIDLookUp.filter(x => x[0] == this.state.activeBongID)[0][0];
        let currentActiveIndexIsFirst = currentActiveIndex === 0;

        this.setState({
            activeBongID: currentActiveIndexIsFirst ? (this.props.bongImagePathIDLookUp.length - 1) : (currentActiveIndex - 1)
        });
    };

    renderBong = (bong: [number, any]) => {
        return (
            <div onWheel={this.handleWheel} onTouchStart={this.handleTouchStart}>
            <ScrollTrigger >
                <div className={this.state.activeBongID == bong[0] ? "drewfis-container" : "hide-bong drewfis-container"}>
                    <div>
                    <div className={"bong-image-holder"}>
                        <img src={bong[1]} className={"bong-image"}/>
                    </div>

                        <i aria-hidden="true" onClick={this.handleNextClick} className={"nextCircle"}>
                            <FontAwesomeIcon icon="arrow-right" className={"next"}/>
                        </i>

                        <i aria-hidden="true" onClick={this.handlePrevClick} className={"prevCircle"}>
                            <FontAwesomeIcon icon="arrow-left" className={"previous"}/>
                        </i>
                    </div>
                </div>
                </ScrollTrigger>
            </div>
        );
    };

    public render() {
        return (
            <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-12 scroll-drew" ref={ref => this.scrollDiv = ref}>
                                    {this.state.bongImages && this.state.bongImages.map(bong => this.renderBong(bong))}
                <Button bsStyle="primary" className={"btn-block"} style={{marginTop: "10px", marginBottom: "10px"}}>Upgrade Bowl</Button>
                <Button bsStyle="success" className={"btn-block"} style={{marginTop: "10px", marginBottom: "10px"}}>Purchase</Button>
            </div>
        );
    }
}

export default RotatingBong;


/*interface ScrollWrapperProps {
    onWindowScroll: (e) => void;
}
interface ScrollWrapperState {

}

export class ScrollWrapper extends React.Component<ScrollWrapperProps, ScrollWrapperState>{
    constructor(props) {
        super(props);
        //this.handleScroll = this.handleScroll.bind(this);
        this.state = {

        };
    }

    handleScroll = (e) => {
        // Do something generic, if you have to
        console.log("ScrollWrapper's handleScroll");
        // Call the passed-in prop
        if (this.props.onWindowScroll) this.props.onWindowScroll(event);
    };



    componentDidMount() {
        if (this.props.onWindowScroll) window.addEventListener("scroll", this.handleScroll);
    };

    componentWillUnmount() {
        if (this.props.onWindowScroll) window.removeEventListener("scroll", this.handleScroll);
    };
};*/

