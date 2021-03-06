import React from 'react';
import AppViews from './views/AppViews';
import DeployerViews from './views/DeployerViews';
import AttacherViews from './views/AttacherViews';
import { renderDOM, renderView } from './views/render';
import * as backend from './build/index.main.mjs';
import * as reach from '@reach-sh/stdlib/ETH';

//import './App.css';
import './src/index.css'

const { standardUnit } = reach;
const defaults = { varsayilanUcret: '1', standardUnit };
//const axios = require('axios');
//console.log(axios);
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { view: 'ConnectAccount', ...defaults };
    }
    async componentDidMount() {
        const acc = await reach.getDefaultAccount();
        const balAtomic = await reach.balanceOf(acc);
        const bal = reach.formatCurrency(balAtomic, 4);
        this.setState({ acc, bal });
        try {
            const faucet = await reach.getFaucet();
            this.setState({ view: 'FundAccount', faucet });
        } catch (e) {
            this.setState({ view: 'DeployerOrAttacher' });
        }
    }
    async fundAccount(fundAmount) {
        await reach.transfer(this.state.faucet, this.state.acc, reach.parseCurrency(fundAmount));
        this.setState({ view: 'DeployerOrAttacher' });
    }
    async skipFundAccount() { this.setState({ view: 'DeployerOrAttacher' }); }
    selectAttacher() { this.setState({ view: 'Wrapper', ContentView: Attacher }); }
    selectDeployer() { this.setState({ view: 'Wrapper', ContentView: Deployer }); }
    render() { return renderView(this, AppViews); }
}

class Deployer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { view: 'UcretBelirle', account: props.account, sozlesme:''};
    }
    ucretiUygula(ucret) { this.setState({ view: 'Deploy', ucret }); }
    async deploy() {
        const ctc = this.props.acc.deploy(backend);
        this.setState({ view: 'Deploying', ctc });
        this.ucret = reach.parseCurrency(this.state.ucret); // UInt
        backend.Admin(ctc, this);
        const ctcInfoStr = JSON.stringify(await ctc.getInfo(), null, 2);
        this.state.sozlesme = ctcInfoStr;
        this.setState({ view: 'WaitingForAttacher', ctcInfoStr });
    }

    async oyunuBitir() {
        const atomikBakiye = await reach.balanceOf(this.state.account);
        const bakiye = reach.formatCurrency(atomikBakiye, 4);
        return await new Promise(resolveBitir => {
            this.setState({ view: 'OyunuBitir', bakiye: bakiye, sozlesme: this.state.sozlesme, resolveBitir });
        });
    }
    oyunuBitirBelirle(cevap) {
        this.state.resolveBitir(cevap);
    }

    async transferiGor(){
        const atomikBakiye = await reach.balanceOf(this.state.account);
        const bakiye = reach.formatCurrency(atomikBakiye, 4);
        console.log("Transferi g??r geldi", bakiye);
        this.setState((state) => ({ bakiye: bakiye }));

    }
    render() { return renderView(this, DeployerViews); }
}

class Attacher extends React.Component {
    constructor(props) {
        super(props);
        this.state = { view: 'Attach', oncekiHamle: 0, account: props.account };
    }
    attach(ctcInfoStr) {
        const ctc = this.props.acc.attach(backend, JSON.parse(ctcInfoStr));
        this.setState({ view: 'Attaching' });
        backend.Oyuncu(ctc, this);
    }


    async hamleYap() {
        const atomikBakiye = await reach.balanceOf(this.state.account);
        const bakiye = reach.formatCurrency(atomikBakiye, 4);
        const hamleListesi = await new Promise(resolveHamle => {
            this.setState({ view: 'HamleYap', oncekiHamle: this.state.oncekiHamle, bakiye: bakiye, resolveHamle });
        });
        return hamleListesi;
    }
    hamleYapBelirle(hamle) {
        console.log(hamle,"HAMLEE");
        this.state.resolveHamle(hamle);
    }

    async sonucuGor(hamleListesi) {
        const atomikBakiye = await reach.balanceOf(this.state.account);
        const bakiye = reach.formatCurrency(atomikBakiye, 4);
        let filtreArray = reach.bigNumberToNumber(hamleListesi);
        this.setState((state) => ({ oncekiHamle: filtreArray, bakiye: bakiye}));
    }


    async acceptWager(wagerAtomic) { // Fun([UInt], Null)
        const wager = reach.formatCurrency(wagerAtomic, 4);
        return await new Promise(resolveAcceptedP => {
          this.setState({view: 'AcceptTerms', wager, resolveAcceptedP});
        });
      }
      termsAccepted() {
        this.state.resolveAcceptedP();
        this.setState({view: 'WaitingForTurn'});
      }

      
    render() { return renderView(this, AttacherViews); }
}

renderDOM(<App />);
