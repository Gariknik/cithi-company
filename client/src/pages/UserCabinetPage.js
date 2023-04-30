import React, {useCallback, useEffect, useState} from 'react';
import styled from "styled-components";
import userAvatar from "../assets/userAvatar.svg"
import {useTranslation} from "react-i18next";
import trash from "../assets/trash.svg"
import {getUserOrders, deleteOrder} from "../entities/api"



const UserCabinetPage = ({ data }) => {
    const { t, i18n } = useTranslation('translation', { keyPrefix: 'cabinet' });

    const changeLanguage = (language) => {
        i18n.changeLanguage(language)
    };

    const [userOrders, setUserOrders] = useState([]);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [isItemTrash, setIsItemTrash] = useState(false);

    const fetchUserOrders = useCallback(async () => {
        const url = `/user_orders/${encodeURIComponent(data.id)}`;
        const orders = await getUserOrders(url);
        setUserOrders(orders);
    }, [data.id]);

    useEffect(() => {
        fetchUserOrders();
    }, [fetchUserOrders, isItemTrash]);

    const handleDeleteOrder = useCallback(async (id) => {
        const url = `/delete/${encodeURIComponent(id)}`;
        await deleteOrder(url);
        setUserOrders(prevState => {
            const updatedOrders = prevState.orders.filter((order) => order.id !== id);
            return { ...prevState, orders: updatedOrders };
        });
    }, []);

    const handleItemClick = useCallback((index) => {
        setActiveIndex(activeIndex === index ? -1 : index);
    }, [activeIndex]);



    const renderStats = () => {
        if (userOrders.orders && userOrders.orders.length !== 0) {
            return userOrders.orders.map((order, index) => (
                <>
                    <StyledItem key={index}>
                        <StyledData>
                            <StyledText>{order.name_service}</StyledText>
                        </StyledData>
                        <StyledData>
                            <StyledText>{order.count_item} w</StyledText>
                        </StyledData>
                        <StyledData>
                            <StyledText>{order.price} doll</StyledText>
                        </StyledData>
                        <StyledData>
                            <StyledText>{order.cost} doll</StyledText>
                        </StyledData>
                        <StyledData>
                            <StyledBtnTogle onClick={() => handleItemClick(index)}>
                                {activeIndex === index ? "-" : "+"}
                            </StyledBtnTogle>
                        </StyledData>
                    </StyledItem>
                    {activeIndex === index && (
                        <>
                            {order.orders_for_price_id.map((item, i) => (
                                <StyledItemHower key={i} >
                                    <StyledData>
                                        <StyledText>{item.name_service}</StyledText>
                                    </StyledData>
                                    <StyledData>
                                        <StyledText>{item.price} doll</StyledText>
                                    </StyledData>
                                    <StyledData>
                                        <StyledText>{item.order_date}</StyledText>
                                    </StyledData>
                                    <StyledData>
                                        <StyledBtnClose onClick={() => {handleDeleteOrder(item.id);
                                                                        setIsItemTrash(item.id);
                                                                        changeLanguage(i18n.language);}}>
                                            <img src={trash} alt={t("alts.iconTrash")}/>
                                        </StyledBtnClose>
                                    </StyledData>
                                </StyledItemHower>
                            ))}
                        </>
                    )}
                    {(isItemTrash !== order.id || order.orders_for_price_id.length === 0) && (
                        <></>
                    )}
                </>
            ));
        } else {
            return (
                <>
                    <StyledItem>
                        <StyledData>
                            <StyledText>-No orders-</StyledText>
                        </StyledData>
                    </StyledItem>
                </>
            );
        }
    };

    return (
        <StyledSection>
            <StyledContainer>
                <StyledWrapImg>
                    <img src={userAvatar} alt={t("alts.iconMain")} />
                </StyledWrapImg>
                <StyledWrapData>
                    <StyledTextUsername>{t("username")} : {data.username}</StyledTextUsername>
                    <StyledTextEmail>{t("email")} : {data.email}</StyledTextEmail>
                    <StyledStatBlock>
                        <StyledSecondTitle>{t("title")}</StyledSecondTitle>
                    </StyledStatBlock>
                    {renderStats()}
                </StyledWrapData>
            </StyledContainer>
        </StyledSection>
);
};

export default UserCabinetPage;

const StyledSection = styled.section`
    margin-top: 70px;
    justify-content: center;
    width: 100%;
    @media (max-width: 1170px) {
       height: 100%;
    };
`;

const StyledContainer = styled.div`
    padding: 100px 100px 100px;
    display: flex;
    @media (max-width: 600px) {
       padding: 2rem;
    };
`;

const StyledWrapImg = styled.div`
    @media (max-width: 1170px) {
       display: none;
    };
`;

const StyledWrapData = styled.div`
    padding: 0 0 0 6rem;
    
    @media (max-width: 1170px) {
       padding: 0 0 6rem;
       margin: 0 auto;
    };
`;

const StyledTextUsername = styled.p`
    font-weight: 400;
    font-size: 1.25rem;
    color: rgba(0, 0, 0, 0.5);
`;

const StyledTextEmail = styled.p`
    font-weight: 400;
    font-size: 1.25rem;
    color: rgba(0, 0, 0, 0.5);
    margin-top: 2.125rem;
`;

const StyledStatBlock = styled.div`
    display: flex;
    flex-direction: column;
    padding: 4rem 0 0 0;
    
`;

const StyledSecondTitle = styled.h2`
    font-weight: 400;
    font-size: 1.5rem;
    color: #83C166;
    display: block;
    text-align: center;
    max-width: 720px;
`;

const StyledData = styled.div`
    display: flex;
    justify-content: center;
    align-self: center;
    padding: 0 2rem;
    height: 3rem;
    width: 170px;
    @media (max-width: 900px) {
       width: 200px;
       padding: 0;
    };
    
`;

const StyledItem = styled.div`
    width: 760px;
    height: 65px;
    border-radius: 30px;
    box-shadow: 0 0 5px rgba(0, 0, 0, .3);
    display: flex;
    padding: 0.5rem 0;

    justify-content: center;
    margin-top: 2.1rem;
    @media (max-width: 900px) {
       flex-direction: column;
       height: 280px;
       width: 240px;
       padding: 1rem;
    };
`;



const StyledText = styled.p`
    font-weight: 400;
    font-size: 1.25rem;
    line-height: 3rem;
    
`;

const StyledBtnTogle = styled.button`
    backgrond: none;
    border-radius: 10px;
    font-size: 1.5rem;
    width: 2rem;
    height: 2rem;
    cursor: pointer;
    align-self: center;
    `;

const StyledItemHower = styled.div`
    width: 660px;
    text-align: center;
    height: 65px;
    border-radius: 30px;
    box-shadow: 0 0 5px rgba(0, 0, 0, .3);
    justify-content: space-between;
    margin: 2.1rem 0 0 0;
    background: rgba(0, 0, 0, .2);
    overflow: hidden;
    display: flex;
    padding: 0.5rem 0;
    @media (max-width: 900px) {
       flex-direction: column;
       height: 280px;
       width: 240px;
       padding: 1rem;
    };
`;

const StyledBtnClose = styled.button`
    backgrond: none;
    border-radius: 10px;
    font-size: 1.5rem;
    width: 2rem;
    height: 2rem;
    cursor: pointer;
    align-self: center;
    
    `;