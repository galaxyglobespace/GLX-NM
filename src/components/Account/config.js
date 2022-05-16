import Metamask from "../../assets/images/icon/connect-1.png";
import WalletConnect from "../../assets/images/icon/connect-4.png";
import Coinbase from "../../assets/images/icon/connect-5.png";
import TrustWallet from "../../assets/images/icon/TrustWallet.png";
import Torus from "../../assets/images/icon/connect-8.png";

export const connectors = [
  {
    title: "Metamask",
    icon: Metamask,
    connectorId: "injected",
    priority: 1,
  },
  {
    title: "WalletConnect",
    icon: WalletConnect,
    connectorId: "walletconnect",
    priority: 2,
  },
  {
    title: "Trust Wallet",
    icon: TrustWallet,
    connectorId: "injected",
    priority: 3,
  },
  {
    title: "Torus",
    icon: Torus,
    connectorId: "injected",
    priority: 999,
  },
  {
    title: "Coinbase Wallet",
    icon: Coinbase,
    connectorId: "injected",
    priority: 999,
  },
  // {
  //   title: "SafePal",
  //   icon: SafePal,
  //   connectorId: "injected",
  //   priority: 999,
  // },
  // {
  //   title: "Coin98",
  //   icon: Coin98,
  //   connectorId: "injected",
  //   priority: 999,
  // },
];