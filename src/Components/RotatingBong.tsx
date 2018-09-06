import * as React from 'react';
import {circlr} from 'circlr';
import {Button} from 'react-bootstrap';
import ScrollTrigger from 'react-scroll-trigger';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface RotatingBongProps {
    bottomBongLookUp: [number, string][];
    middleBongLookUp: [number, string][];
    topBongLookUp: [number, string][];

}
interface RotatingBongState {
    activeTopBongID: number;
    activeMiddleBongID: number;
    activeBottomBongID: number;
    topBongImages: [number, string][];
    middleBongImages: [number, string][];
    bottomBongImages: [number, string][];
    touchStart: number;
}

enum BongPiece {
    BottomBong,
    MiddleBong,
    TopBong
}

export class RotatingBong extends React.Component<RotatingBongProps, RotatingBongState> {
    /* tslint:disable */
    constructor(props) {
        super(props);

        this.state = {
            activeTopBongID: 0,
            activeMiddleBongID: 0,
            activeBottomBongID: 0,
            topBongImages: this.props.topBongLookUp,
            middleBongImages: this.props.middleBongLookUp,
            bottomBongImages: this.props.bottomBongLookUp,
            touchStart: 0
        };
    }

    private topScrollDiv: HTMLElement;
    private midScrollDiv: HTMLElement;
    private botScrollDiv: HTMLElement;

    private y: number = 0; //current y pos
    private sy: number = this.y; //previous y pos

    private touchStart: number;

    debounce = (func, wait) => {
        console.log(func);
        let timeout;
        return function(...args) {
            const context = this;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        }
    }

    componentDidMount() {
        if (this.topScrollDiv) {
            this.topScrollDiv.addEventListener('wheel', this.debounce((e) => {
                console.log("TOP scroll listenerr");
                this.handleWheel(e, BongPiece.TopBong);
            }, 5));

            this.topScrollDiv.addEventListener('touchstart', this.debounce((e) => { this.handleTouchStart(e) }, 5));
            this.topScrollDiv.addEventListener('touchend', this.debounce((e) => { this.handleTouchEnd(e, BongPiece.TopBong) }, 5));
        }

        if (this.midScrollDiv) {
            this.midScrollDiv.addEventListener('wheel', this.debounce((e) => {
                console.log("MID scroll listenerr");
                this.handleWheel(e, BongPiece.MiddleBong);
            }, 15));

            this.midScrollDiv.addEventListener('touchstart', this.debounce((e) => { this.handleTouchStart(e) }, 15));
            this.midScrollDiv.addEventListener('touchend', this.debounce((e) => { this.handleTouchEnd(e, BongPiece.MiddleBong) }, 15));
        }

        if (this.botScrollDiv) {
            this.botScrollDiv.addEventListener('wheel', this.debounce((e) => {
                console.log("BOT scroll listenerr");

                this.handleWheel(e, BongPiece.BottomBong);
            }, 15));

            this.botScrollDiv.addEventListener('touchstart', this.debounce((e) => { this.handleTouchStart(e) }, 15));
            this.botScrollDiv.addEventListener('touchend', this.debounce((e) => { this.handleTouchEnd(e, BongPiece.BottomBong) }, 15));
        }

        this.setState({
            topBongImages: this.props.topBongLookUp,
            middleBongImages: this.props.middleBongLookUp,
            bottomBongImages: this.props.bottomBongLookUp,
            activeTopBongID: 0,
            activeMiddleBongID: 0,
            activeBottomBongID: 0,
            touchStart: 0
        });
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            topBongImages: this.props.topBongLookUp,
            middleBongImages: this.props.middleBongLookUp,
            bottomBongImages: this.props.bottomBongLookUp,
        });
    }

    handleWheel = (e, type: BongPiece) => {
        if (e.deltaY < 0) {
            console.log('scrolling up');
            this.handleNextClick(type);
        }
        if (e.deltaY > 0) {
            console.log('scrolling down');
            this.handlePrevClick(type);
        }
        if(e.deltaX > 0){
            console.log('scrolling right')
            this.handleNextClick(type);
        }
        if(e.deltaX < 0){
            console.log('scrolling left')
            this.handlePrevClick(type);
        }
    }

    debounceWheel = (type: BongPiece) => {
        this.debounce((e) => { this.handleWheel(e, type) }, 15);
    }

    debounceTouchStart = () => {
        this.debounce((e) => { this.handleTouchStart(e) }, 15);
    }

    debounceTouchEnd = (type: BongPiece) => {
        this.debounce((e) => { this.handleTouchEnd(e, type) }, 15);
    }

    handleTouchStart = (e) => {
        //console.log(e);

        if(e.touches[0] != undefined) {
            this.setState({
                touchStart: e.touches[0] == undefined ? 0 : e.touches[0].clientY
            });
        }
    }

    handleTouchEnd = (e, type: BongPiece) => {
        console.log(e);
        if(e.changedTouches[0] != undefined) {
            var touchEnd = e.changedTouches[0].clientY;

            if (this.state.touchStart > (touchEnd + 5)) {
                this.handleNextClick(type);
            } else {
                this.handlePrevClick(type);
            }
        }
    }

    componentWillUnmount(){
        if(this.topScrollDiv) {
            this.topScrollDiv.removeEventListener('wheel', this.debounce((e) => {
                this.handleWheel(e, BongPiece.TopBong)
            }, 15));

            this.topScrollDiv.removeEventListener('touchstart', this.debounce((e) => { this.handleTouchStart(e) }, 15));
            this.topScrollDiv.removeEventListener('touchend', this.debounce((e) => { this.handleTouchEnd(e, BongPiece.TopBong) }, 15));
        }
        if(this.midScrollDiv) {
            this.midScrollDiv.removeEventListener('wheel', this.debounce((e) => {
                this.handleWheel(e, BongPiece.MiddleBong)
            }, 15));

            this.midScrollDiv.removeEventListener('touchstart', this.debounce((e) => { this.handleTouchStart(e) }, 15));
            this.midScrollDiv.removeEventListener('touchend', this.debounce((e) => { this.handleTouchEnd(e, BongPiece.MiddleBong) }, 15));
        }
        if(this.botScrollDiv) {
            this.botScrollDiv.removeEventListener('wheel', this.debounce((e) => {
                this.handleWheel(e, BongPiece.BottomBong)
            }, 15));

            this.botScrollDiv.removeEventListener('touchstart', this.debounce((e) => { this.handleTouchStart(e) }, 15));
            this.botScrollDiv.removeEventListener('touchend', this.debounce((e) => { this.handleTouchEnd(e, BongPiece.BottomBong) }, 15));
        }

    }

    toggleActive = (newActiveID: number, type: BongPiece) => {
        this.setState({
            activeTopBongID: type == BongPiece.TopBong ? newActiveID : this.state.activeTopBongID,
            activeMiddleBongID: type == BongPiece.MiddleBong ? newActiveID : this.state.activeMiddleBongID,
            activeBottomBongID: type == BongPiece.BottomBong ? newActiveID : this.state.activeBottomBongID
        });
    };

    handleNextClick = (bongPieceType: BongPiece) => {
        let currentActiveIndex: number = 0;
        let currentActiveIndexIsLast: boolean = false;

        if(bongPieceType == BongPiece.TopBong){
            currentActiveIndex = this.props.topBongLookUp.filter(x => x[0] == this.state.activeTopBongID)[0][0];
            currentActiveIndexIsLast = currentActiveIndex === (this.props.topBongLookUp.length - 1);
        }

        if(bongPieceType == BongPiece.MiddleBong){
            currentActiveIndex = this.props.middleBongLookUp.filter(x => x[0] == this.state.activeMiddleBongID)[0][0];
            currentActiveIndexIsLast = currentActiveIndex === (this.props.middleBongLookUp.length - 1);
        }

        if(bongPieceType == BongPiece.BottomBong){
            currentActiveIndex = this.props.bottomBongLookUp.filter(x => x[0] == this.state.activeBottomBongID)[0][0];
            currentActiveIndexIsLast = currentActiveIndex === (this.props.middleBongLookUp.length - 1);
        }

        this.setState({
            activeTopBongID: bongPieceType == BongPiece.TopBong ? (currentActiveIndexIsLast ? 0 : (currentActiveIndex + 1)) : this.state.activeTopBongID,
            activeMiddleBongID: bongPieceType == BongPiece.TopBong ? (currentActiveIndexIsLast ? 0 : (currentActiveIndex + 1)) : this.state.activeMiddleBongID,
            activeBottomBongID: bongPieceType == BongPiece.TopBong ? (currentActiveIndexIsLast ? 0 : (currentActiveIndex + 1)) : this.state.activeBottomBongID,
        });
    };

    handlePrevClick = (bongPieceType: BongPiece) => {
        let currentActiveIndex: number = 0;
        let currentActiveIndexIsFirst: boolean = false;

        if(bongPieceType == BongPiece.TopBong) {
            currentActiveIndex = this.props.topBongLookUp.filter(x => x[0] == this.state.activeTopBongID)[0][0];
            currentActiveIndexIsFirst = currentActiveIndex === 0;
        }

        if(bongPieceType == BongPiece.MiddleBong) {
            currentActiveIndex = this.props.middleBongLookUp.filter(x => x[0] == this.state.activeMiddleBongID)[0][0];
            currentActiveIndexIsFirst = currentActiveIndex === 0;
        }

        if(bongPieceType == BongPiece.BottomBong) {
            currentActiveIndex = this.props.bottomBongLookUp.filter(x => x[0] == this.state.activeBottomBongID)[0][0];
            currentActiveIndexIsFirst = currentActiveIndex === 0;
        }

        this.setState({
            activeTopBongID: bongPieceType == BongPiece.TopBong ? (currentActiveIndexIsFirst ? (this.props.topBongLookUp.length - 1) : (currentActiveIndex - 1)) : this.state.activeTopBongID,
            activeMiddleBongID: bongPieceType == BongPiece.TopBong ? (currentActiveIndexIsFirst ? (this.props.middleBongLookUp.length - 1) : (currentActiveIndex - 1)) : this.state.activeMiddleBongID,
            activeBottomBongID: bongPieceType == BongPiece.TopBong ? (currentActiveIndexIsFirst ? (this.props.bottomBongLookUp.length - 1) : (currentActiveIndex - 1)) : this.state.activeBottomBongID
        });
    };

    // TODO: Refactor and make each piece a seperate componenet...
    renderBong = (type: BongPiece, topBong?: [number, any], middleBong?: [number, any], bottomBong?: [number, any]) => {
        if(type == BongPiece.TopBong && topBong) {
            return (
                <div onWheel={() => this.debounceWheel(BongPiece.TopBong)} onTouchStart={this.debounceTouchStart}
                     onTouchEnd={() => this.debounceTouchEnd(BongPiece.TopBong)}  ref={ref => this.topScrollDiv = ref}>
                    <ScrollTrigger>
                        <div
                            className={this.state.activeTopBongID == topBong[0] ? "drewfis-container" : "hide-bong drewfis-container"}>
                            <div className={"bong-image-holder"}>
                                <img src={topBong[1]} className={"bong-image"}/>
                            </div>

                            <i aria-hidden="true" onClick={() => this.handleNextClick(BongPiece.TopBong)}
                               className={"nextCircle"}>
                                <FontAwesomeIcon icon="arrow-right" className={"next"}/>
                            </i>

                            <i aria-hidden="true" onClick={() => this.handlePrevClick(BongPiece.TopBong)}
                               className={"prevCircle"}>
                                <FontAwesomeIcon icon="arrow-left" className={"previous"}/>
                            </i>
                        </div>
                    </ScrollTrigger>
                </div>
            );
        }
        else if(type == BongPiece.MiddleBong && middleBong) {
            return (
                <div onWheel={() => this.debounceWheel(BongPiece.MiddleBong)} onTouchStart={this.debounceTouchStart}
                     onTouchEnd={() => this.debounceTouchEnd(BongPiece.MiddleBong)} ref={ref => this.midScrollDiv = ref}>
                    <ScrollTrigger >
                        <div className={this.state.activeMiddleBongID == middleBong[0] ? "drewfis-container" : "hide-bong drewfis-container"}>
                            <div className={"bong-image-holder"}>
                                <img src={middleBong[1]} className={"bong-image"}/>
                            </div>

                            <i aria-hidden="true" onClick={() => this.handleNextClick(BongPiece.MiddleBong)} className={"nextCircle"}>
                                <FontAwesomeIcon icon="arrow-right" className={"next"}/>
                            </i>

                            <i aria-hidden="true" onClick={() => this.handlePrevClick(BongPiece.MiddleBong)} className={"prevCircle"}>
                                <FontAwesomeIcon icon="arrow-left" className={"previous"}/>
                            </i>
                        </div>
                    </ScrollTrigger>
                </div>
            );
        }
        else if(type == BongPiece.BottomBong && bottomBong) {
            return (
                <div onWheel={() => this.debounceWheel(BongPiece.BottomBong)} onTouchStart={this.debounceTouchStart}
                     onTouchEnd={() => this.debounceTouchEnd(BongPiece.BottomBong)} ref={ref => this.botScrollDiv = ref}>
                    <ScrollTrigger>
                        <div
                            className={this.state.activeBottomBongID == bottomBong[0] ? "drewfis-container" : "hide-bong drewfis-container"}>
                            <div className={"bong-image-holder"}>
                                <img src={bottomBong[1]} className={"bong-image"}/>
                            </div>

                            <i aria-hidden="true" onClick={() => this.handleNextClick(BongPiece.BottomBong)}
                               className={"nextCircle"}>
                                <FontAwesomeIcon icon="arrow-right" className={"next"}/>
                            </i>

                            <i aria-hidden="true" onClick={() => this.handlePrevClick(BongPiece.BottomBong)}
                               className={"prevCircle"}>
                                <FontAwesomeIcon icon="arrow-left" className={"previous"}/>
                            </i>
                        </div>
                    </ScrollTrigger>
                </div>
            );
        }
    };

    public render() {
        return (
            <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-12 scroll-drew">
                                    {this.state.topBongImages && this.state.topBongImages.map(topBong => this.renderBong(BongPiece.TopBong, topBong))}
                                    {this.state.middleBongImages && this.state.middleBongImages.map(midBong => this.renderBong(BongPiece.MiddleBong, null,  midBong))}
                                    {this.state.bottomBongImages && this.state.bottomBongImages.map(botBong => this.renderBong(BongPiece.BottomBong, null, null, botBong))}

                <Button bsStyle="primary" className={"btn-block"} style={{marginTop: "10px", marginBottom: "10px"}}>Upgrade Bowl</Button>
                <Button bsStyle="success" className={"btn-block"} style={{marginTop: "10px", marginBottom: "10px"}}>Purchase</Button>
            </div>
        );
    }
}

export default RotatingBong;
