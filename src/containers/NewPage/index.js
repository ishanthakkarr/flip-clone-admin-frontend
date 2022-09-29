import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout';
import Modal from '../../components/UI/Modal'
import Input from '../../components/UI/Input';
import { Row, Col, Container } from 'react-bootstrap';
import linearCategory from '../../helpers/linearCategories'
import { useSelector, useDispatch } from 'react-redux';
import Category from '../Category';
import { createPage } from '../../actions';
/**
* @author
* @function NewPage
**/

const NewPage = (props) => {
    const [createModal, setCreateModal] = useState(false);
    const [title, setTitle] = useState('');
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [desc, setDesc] = useState('');
    const [banners, setBanners] = useState([]);
    const [products, setProducts] = useState([]);
    const [type, setType] = useState('');

    const category = useSelector(state => state.category);
    const page = useSelector(state => state.page);

    const dispatch = useDispatch();


    useEffect(() => {
        setCategories(linearCategory(category.categories));
    }, [category]);

    useEffect(() => {
        console.log(page);
        if (page.loading) {
            setCreateModal(false);
            setTitle('');
            setDesc('');
            setCategoryId('');
            setProducts([]);
            setBanners([]);
        }
    }, [page]);

    const handleBannerImages = (e) => {
        setBanners([...banners, e.target.files[0]]);
    }

    const handleProductImages = (e) => {
        setProducts([...products, e.target.files[0]]);
    }

    const onCategoryChange = (e) => {
        debugger
        const selectedCategory = categories.find((cat) => cat.value == e.target.value);
        setCategoryId(e.target.value);
        setType(selectedCategory.type);
    }

    const submitPageForm = () => {

        if (title === "") {
            alert('Title is requied');
            setCreateModal(false);
            return;
        }

        const form = new FormData();
        form.append('title', title);
        form.append('description', desc)
        form.append('category', categoryId)
        form.append('type', type)

        banners.forEach((banner, index) => {
            form.append('banners', banner);

        })

        products.forEach((product, index) => {
            form.append('products', product);

        })
        // setCreateModal(false);
        dispatch(createPage(form));
        console.log("data ==>" + title, desc, categoryId, type, banners, products)
    }

    const renderCreatePageModal = () => {
        return (
            <Modal
                show={createModal}
                modalTitle={'Create New Page'}
                handleClose={() => setCreateModal(false)}
                onSubmit={submitPageForm}
            >
                <Container>
                    <Row>
                        <Col>
                            {/* <select
                                className="form-control form-control-sm"
                                value={categoryId}
                                onChange={onCategoryChange}
                            >
                                <option value="">select category</option>
                                {
                                    categories.map(cat =>
                                        <option key={cat.value} value={cat.value}>{cat.name}</option>
                                    )
                                }
                            </select> */}
                            <Input
                                type="select"
                                value={categoryId}
                                onChange={onCategoryChange}
                                options={categories}
                                placeholder={"select category"}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder={'Page Title'}
                                className="form-control-sm"
                            >
                            </Input>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Input
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                                placeholder={'Page Desc'}
                                className="form-control-sm"
                            >
                            </Input>
                        </Col>
                    </Row>
                    <Row>
                        {
                            banners.length > 0 ?
                                banners.map((banner, index) =>
                                    <Row key={index}>
                                        <Col>{banner.name}</Col>
                                    </Row>
                                ) : null
                        }
                        <Col>
                            <label>select banner images</label>
                            <Input
                                className="form-control form-control-sm"
                                type="file"
                                name="banners"
                                onChange={handleBannerImages}
                            >
                            </Input>
                        </Col>
                    </Row>
                    <Row>
                        {
                            products.length > 0 ?
                                products.map((product, index) =>
                                    <Row key={index}>
                                        <Col>{product.name}</Col>
                                    </Row>
                                ) : null
                        }
                        <Col>
                            <label>select product images</label>

                            <Input
                                className="form-control form-control-sm"
                                type="file"
                                name="products"
                                onChange={handleProductImages}
                            >
                            </Input>
                        </Col>
                    </Row>
                </Container>
            </Modal>
        )
    }
    return (
        <Layout sidebar>
            {
                page.loading ? <p>Creating page please wait...</p> :
                    <>
                        {renderCreatePageModal()}
                        < button onClick={() => setCreateModal(true)}>Create Page</button></>
            }

        </Layout >
    )

}

export default NewPage