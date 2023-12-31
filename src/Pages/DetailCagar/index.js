import React, { useEffect, useState } from 'react'
import swal from 'sweetalert';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { useParams } from 'react-router-dom'
import './detailCagar.css'
import { deleteCagarBudaya, getSinggleCagarBudaya } from '../../utils/cagarBudaya';
import Navbar from '../../Components/Landing/Navbar';

import Comments from '../../Components/Comments';

const DetailCagar = () => {
    const { id } = useParams();
    localStorage.setItem("cagarbudayaId", id)

    const [detailData, setDetailData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getSinggleCagarBudaya(id)
            .then(result => {
                setDetailData(result.data);
                setLoading(false)
            })
            .catch(err => {
                console.log('error : ', err);
            })
    }, [id])

    const [currentActiveTab, setCurrentActiveTab] = useState('1');

    const toggleTab = tab => {
        if (currentActiveTab !== tab) setCurrentActiveTab(tab);
    }

    if(loading) {
        return (
            <div>Loading...</div>
        )
    }

            return (
                <div className="home-container">
                    <Navbar />
                    <article className="container detail-content" id="content">
                    <article className="cat-img position-relative px-3">
                        <img className="cagar-img w-100 shadow-sm" src={`https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg`} alt="gambar cagar budaya" tabIndex="0"/>
                        <p className="shadow-cat-card border-top-0"></p>
                        <p className="category-card text-center text-uppercase fw-bold pt-2" tabIndex="0">{detailData.kategoris.nama}</p>
                    </article>

                    <article>
                    <p className="cagar-title mt-5 mb-3 mr-5 fw-bold">{detailData.nama}</p>
                    </article>

                    <article className="mb-5 px-3">
                        <Nav tabs>
                            <NavItem>
                                <NavLink className={currentActiveTab === '1' ? "tabs-active-tabs" : "tabs"} 
                                tabIndex="0" 
                                onKeyDown={() => { toggleTab('1'); }}
                                onClick={() => { toggleTab('1'); }}>
                                    Keberadaan
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className={currentActiveTab === '2' ? "tabs-active-tabs" : "tabs"} 
                                tabIndex="0" 
                                onKeyDown={() => { toggleTab('2'); }}
                                onClick={() => { toggleTab('2'); }}>
                                    Sejarah
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className={currentActiveTab === '3' ? "tabs-active-tabs" : "tabs"} 
                                tabIndex="0" 
                                onKeyDown={() => { toggleTab('3'); }}
                                onClick={() => { toggleTab('3'); }}>
                                    Deskripsi
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={currentActiveTab} className="shadow">
                            <TabPane tabId="1">
                                <article className="row">
                                    <section className="col-sm-12">
                                        <p className="px-1 pt-2">Provinsi: <span>{detailData.provinsi}</span></p>
                                        <p className="px-1">Kabupaten/ Kota: <span>{detailData.kabupaten}</span></p>
                                    </section>
                                </article>
                            </TabPane>
                            <TabPane tabId="2">
                                <article className="row">
                                    <section className="col-sm-12">
                                        <p className="px-1 pt-2 text-break">{detailData.kategoris.nama}</p>
                                    </section>
                                </article>
                            </TabPane>
                            <TabPane tabId="3">
                                <article className="row">
                                    <section className="col-sm-12">
                                        <p className="px-1 pt-2 text-break">{detailData.deskripsi}</p>
                                    </section>
                                </article>
                            </TabPane>
                        </TabContent>
                    </article>
                    <Comments />
                </article>
                </div>
            )
}

export default DetailCagar;
