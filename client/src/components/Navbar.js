import React from "react";

// RMWC Drawer
import { Drawer,DrawerHeader, DrawerTitle, DrawerSubtitle, DrawerContent } from "@rmwc/drawer";
import '@material/drawer/dist/mdc.drawer.css';

// RMWC TopAppBar
import {SimpleTopAppBar, TopAppBarFixedAdjust} from '@rmwc/top-app-bar';
import '@material/top-app-bar/dist/mdc.top-app-bar.css';

// RMWC List
import {SimpleListItem, CollapsibleList, List} from "@rmwc/list";
import '@material/list/dist/mdc.list.css';
import '@rmwc/list/collapsible-list.css';

// React Router Links for Navigation
import {Link} from "react-router-dom";

// State from Provider
// import {AppContext} from "./AppProvider";

export class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            DrawerIsOpen: true
        };
        this.toggleDrawer = this.toggleDrawer.bind(this);
    }

    toggleDrawer(status = ! this.state.DrawerIsOpen ) {
        this.setState({
            DrawerIsOpen: status
        });
    }

    render() {
        return (
            <div>
                <SimpleTopAppBar
                    title="Some App"
                    navigationIcon={{ onClick: () => this.toggleDrawer()}}
                    actionItems={[]}
                />

                <Drawer modal open={this.state.DrawerIsOpen} onClose={() => this.toggleDrawer(false)}>

                    <DrawerHeader>
                        <DrawerTitle>Hello</DrawerTitle>
                        <DrawerSubtitle>hi</DrawerSubtitle>
                    </DrawerHeader>

                    <DrawerContent>
                        <List>
                            {/*LogIn Button*/}

                            <Link to="/" className={["no-decoration"]}>
                                <SimpleListItem
                                    text="Home"
                                    graphic="home"
                                />
                            </Link>

                            <CollapsibleList
                                handle={
                                    <SimpleListItem
                                        text="Game"
                                        graphic="videogame_asset"
                                        metaIcon="chevron_right"
                                    />
                                }
                            >
                                <Link to="/my-games" className={["no-decoration"]}>
                                    <SimpleListItem text={"My Games"} graphic={"dashboard"}/>
                                </Link>

                                <Link to="/create-game" className={["no-decoration"]}>
                                    <SimpleListItem text={"Create Game"} graphic={"add"}/>
                                </Link>

                                <Link to="/" className={["no-decoration"]}>
                                    <SimpleListItem text={"Join Game"} graphic={"how_to_reg"}/>
                                </Link>
                            </CollapsibleList>
                        </List>
                    </DrawerContent>
                </Drawer>

                <TopAppBarFixedAdjust />

            </div>
        )
    }
}
