import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory, addCategory, updateCategories, deleteCategories as deleteCategoriesAction } from '../../actions';
import Input from '../../components/UI/Input';
import Modal from '../../components/UI/Modal';
import CheckboxTree from 'react-checkbox-tree';
import {
    IoIosCheckboxOutline,
    IoIosCheckbox,
    IoIosArrowForward,
    IoIosArrowDown,
    IoIosAdd,
    IoIosTrash,
    IoIosCloudUpload
} from 'react-icons/io';
import UpdateCategoryModal from './components/UpdateCategoriesModal';
import AddCategoryModal from './components/AddCategoryModal';
import DeleteCategoryModal from './components/DeleteCategoryModal';
import './style.css'
/** 
* @author
* @function Category
**/

const Category = (props) => {
    const [show, setShow] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const [parentCategoryId, setParentCategoryId] = useState('');
    const [categoryImage, setCategoryImage] = useState('');
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [checkedArray, setCheckedArray] = useState([]);
    const [expandedArray, setExpandedArray] = useState([]);
    const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
    const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);
    const category = useSelector(state => state.category);
    const dispatch = useDispatch();

    useEffect(() => {
        if(category.loading){
            setShow(false);
        }
    },[category.loading]);
    const handleClose = () => {
        const form = new FormData();
        // if(categoryName === ""){
        //     alert("Name is required");
        //     return;
        // }
        if(categoryName===""){
            alert("Category name is required");
            setShow(false);
            return;
        }
        form.append('name', categoryName);
        form.append('parentId', parentCategoryId);
        form.append('categoryImage', categoryImage);
        dispatch(addCategory(form));
        setCategoryName('');
        setParentCategoryId('');
        setCategoryImage('');
        setShow(false)
    };
    const handleShow = () => setShow(true);

    const renderCategories = (categories) => {
        let _categories = [];
        for (let category of categories) {
            _categories.push(
                {
                    label: category.name,
                    value: category._id,
                    children: category.children.length > 0 && renderCategories(category.children)
                }
            );
        }
        return _categories;
    }

    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({
                value: category._id,
                name: category.name,
                parentId: category.parentId,
                type:category.type
            })
            if (category.children.length > 0) {
                createCategoryList(category.children, options);
            }
        }
        return options;
    }

    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0]);
    }

    const handleupdateCategoryShow = () => {
        updateCheckedAndExpandedCategories();
        setUpdateCategoryModal(true);
    }

    const updateCheckedAndExpandedCategories = () => {
        const categories = createCategoryList(category.categories);
        const checkedArray = [];
        const expandedArray = [];
        checked.length > 0 && checked.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId == category.value);
            category && checkedArray.push(category);
        })
        expanded.length > 0 && expanded.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId == category.value);
            category && expandedArray.push(category);
        })
        setCheckedArray(checkedArray);
        setExpandedArray(expandedArray);
        console.log(categories, checkedArray, expandedArray)
    }

    const handleCategoryInput = (key, value, index, type) => {
        if (type == "checked") {
            const updatedCheckedArray = checkedArray.map((item, _index) => index == _index ? { ...item, [key]: value } : item);
            setCheckedArray(updatedCheckedArray);
        } else if (type == "expanded") {
            const updatedExpandedArray = expandedArray.map((item, _index) => index == _index ? { ...item, [key]: value } : item);
            setExpandedArray(updatedExpandedArray);
        }
    }

    const updateCategoriesForm = () => {
        const form = new FormData();
        expandedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('parentId', item.parentId ? item.parentId : "");
            form.append('type', item.type);
        })
        checkedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('parentId', item.parentId ? item.parentId : "");
            form.append('type', item.type);
        })
        setUpdateCategoryModal(false);
        dispatch(updateCategories(form));
    }

    const deleteCategory = () => {
        updateCheckedAndExpandedCategories();
        setDeleteCategoryModal(true);
    }


    const deleteCategories = () => {
        const checkedIdsArray = checkedArray.map((item, index) => ({ _id: item.value }));
        const expandedIdsArray = expandedArray.map((item, index) => ({ _id: item.value }));
        const idsArray = expandedIdsArray.concat(checkedIdsArray);
        if (checkedIdsArray.length > 0) {
            dispatch(deleteCategoriesAction(checkedIdsArray))
                // .then(result => {
                //     if (result) {
                //         // dispatch(getAllCategory());
                //         setDeleteCategoryModal(false);
                //     }
                // })
        }
        setDeleteCategoryModal(false);
    }

    return (
        <Layout sidebar>
            <Container>
                <Row md={12}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <h3>Category</h3>
                        <div className="actionBtnContainer">
                            <span>Actions: </span>
                            <button onClick={handleShow}><IoIosAdd /> <span>Add</span></button>
                            <button onClick={deleteCategory}><IoIosTrash /><span>Delete</span></button>
                            <button onClick={handleupdateCategoryShow}><IoIosCloudUpload /><span>Edit</span></button>
                        </div>
                    </div>
                </Row>
                <Row>
                    <Col md={12}>
                        {/* <ul>
                            {renderCategories(category.categories)}
                        </ul> */}
                        <CheckboxTree
                            nodes={renderCategories(category.categories)}
                            checked={checked}
                            expanded={expanded}
                            onCheck={checked => setChecked(checked)}
                            onExpand={expanded => setExpanded(expanded)}
                            icons={{
                                check: <IoIosCheckbox />,
                                uncheck: <IoIosCheckboxOutline />,
                                halfCheck: <IoIosCheckboxOutline />,
                                expandClose: <IoIosArrowForward />,
                                expandOpen: <IoIosArrowDown />
                            }}
                        />
                    </Col>
                </Row>
            </Container>
            <UpdateCategoryModal
                show={updateCategoryModal}
                handleClose={updateCategoriesForm}
                modalTitle={'Update Categories'}
                size="lg"
                expandedArray={expandedArray}
                checkedArray={checkedArray}
                handleCategoryInput={handleCategoryInput}
                categoryList={createCategoryList(category.categories)}
                setUpdateCategoryModal={setUpdateCategoryModal}
            />
            <AddCategoryModal
                show={show}
                handleClose={handleClose}
                modalTitle={'Add New Category'}
                expandedArray={expandedArray}
                checkedArray={checkedArray}
                handleCategoryImage={handleCategoryImage}
                categoryList={createCategoryList(category.categories)}
                categoryName={categoryName}
                setCategoryName={setCategoryName}
                parentCategoryId={parentCategoryId}
                setParentCategoryId={setParentCategoryId}
                setShow={setShow}
            />
            <DeleteCategoryModal
                show={deleteCategoryModal}
                handleClose={() => setDeleteCategoryModal(false)}
                modalTitle="Confirm"
                expandedArray={expandedArray}
                checkedArray={checkedArray}
                buttons={[{
                    label: 'No',
                    color: 'primary',
                    onClick: () => { alert("no"); }
                },
                {
                    label: 'Yes',
                    color: 'danger',
                    onClick: deleteCategories
                }
                ]}
            />
        </Layout>
    )

}

export default Category