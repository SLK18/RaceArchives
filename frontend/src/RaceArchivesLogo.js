import React, {
    Component
}
from "react";
import Sketch from "react-p5";

export default class RaceArchivesLogo extends Component {

    constructor(props) {
        super(props);

        function F1Car(speed, trail, color, xpos, ypos) {
            this.speed = speed;
            this.trail = trail;
            this.color = color;
            this.xpos = xpos;
            this.ypos = ypos;
        }

        this.state = ({
            F1CarList: [new F1Car(5, 100, 'hsb(0,100%,100%)', 30, 20),
                new F1Car(4, 100, 'hsb(25,100%,100%)', 60, 50),
                new F1Car(3, 100, 'hsb(50,100%,100%)', 90, 80)],
            canvasx: 1920,
            canvasy: 100
        });
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }
	
	
	//Referenced https://www.hawatel.com/blog/handle-window-resize-in-react/ for resizing
    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ canvasx: window.innerWidth});
    }
	
	

    setup = (p5, parent) => {
        p5.createCanvas(this.state.canvasx, this.state.canvasy).parent(parent);
        p5.background(40);
        p5.noStroke();
    }
	
    draw = p5 => {
		
		p5.clear();
        p5.redraw();

        var speed,trail,color,xpos,ypos;

        for (var i = 0; i < this.state.F1CarList.length; i++) {

            speed = this.state.F1CarList[i].speed;
            trail = this.state.F1CarList[i].trail * speed;
            color = this.state.F1CarList[i].color;
            xpos = this.state.F1CarList[i].xpos;
            ypos = this.state.F1CarList[i].ypos;

            //Draw body
            p5.fill(color);
            p5.beginShape();
            p5.vertex(xpos, ypos);
            p5.vertex(xpos, ypos + 10);
            p5.vertex(xpos + 50, ypos + 10);
            p5.vertex(xpos + 25, ypos);
            p5.endShape();
            //Spoiler
            p5.rect(xpos, ypos - 7, 8, 4);
            //Strut for spoiler
            p5.rect(xpos + 2, ypos - 3, 4, 4);
            //Cockpit
            p5.triangle(xpos, ypos, xpos + 20, ypos, xpos + 20, ypos - 4);
            //Draw trail
            p5.rect(xpos - trail - (speed * speed), ypos, trail, speed);
            //Draw wheels
            p5.circle(xpos + 5, ypos + 8, 10);
            p5.circle(xpos + 40, ypos + 8, 10);

            const newArr = [...this.state.F1CarList];
            newArr[i].xpos += speed;

            if (xpos - trail - (speed * speed) > this.state.canvasx) {
                const hue = Math.floor(Math.random() * 360);
                newArr[i].xpos = -100;
                newArr[i].speed = Math.floor(Math.random() * 7) + 3;
                newArr[i].color = 'hsb(' + hue + ',100%,100%)';
            }
            this.setState({newArr});

            //Draw F1 Logo
            p5.fill(255);
            p5.textSize(77);
            p5.textAlign(p5.CENTER, p5.CENTER);
            p5.text('Race Archives', this.state.canvasx / 2, this.state.canvasy / 2);

        }

    }

    render() {
        return  <Sketch setup = {this.setup} draw = {this.draw}/>
    }
}
