import { Modal, Form, Input, InputNumber, Select } from 'antd';
import { useEffect } from 'react';

export default function EditBook(props) {
    const [form] = Form.useForm();

<<<<<<< HEAD
    useEffect(() => {
        if (props.isOpen && props.item) {
            form.setFieldsValue(props.item);
=======
    // เมื่อเปิด Modal หรือเปลี่ยนเล่ม ให้เอารายละเอียดเก่าไปใส่ในฟอร์ม
    useEffect(() => {
        if (props.isOpen && props.item) {
            form.setFieldsValue(props.item);
            // กรณี category เป็น object ต้องดึง id ออกมาใส่แทนเพื่อให้ Select รู้จัก
>>>>>>> e4e750484a6f6f2e0432ca16a76298fe41cf4b8c
            if (props.item.category) {
                form.setFieldValue('categoryId', props.item.category.id);
            }
        }
    }, [props.isOpen, props.item, form]);

    const handleOk = () => {
        form.validateFields().then(values => {
<<<<<<< HEAD
            props.onSave(values);
=======
            props.onSave(values); // ส่งข้อมูลกลับไปบันทึก
>>>>>>> e4e750484a6f6f2e0432ca16a76298fe41cf4b8c
        }).catch(info => {
            console.log('Validate Failed:', info);
        });
    };

    return (
        <Modal 
            title="Edit Book" 
            open={props.isOpen} 
            onOk={handleOk} 
            onCancel={props.onCancel}
<<<<<<< HEAD
            width={600}
=======
>>>>>>> e4e750484a6f6f2e0432ca16a76298fe41cf4b8c
        >
            <Form form={form} layout="vertical" name="edit_book_form">
                <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
<<<<<<< HEAD

                <Form.Item name="author" label="Author" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item name="description" label="Description">
                    <Input.TextArea rows={3} />
                </Form.Item>

                <Form.Item name="price" label="Price" rules={[{ required: true }]}>
                    <InputNumber min={0} step={0.01} style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item name="isbn" label="ISBN" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item name="stock" label="Stock" rules={[{ required: true }]}>
                    <InputNumber min={0} style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item name="categoryId" label="Category" rules={[{ required: true }]}>
                    <Select options={props.categories} />
                </Form.Item>

                <Form.Item name="coverUrl" label="Cover URL">
                    <Input placeholder="Paste image URL or leave blank" />
                </Form.Item>
=======
                <Form.Item name="author" label="Author" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="price" label="Price" rules={[{ required: true }]}>
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item name="stock" label="Stock" rules={[{ required: true }]}>
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item name="categoryId" label="Category" rules={[{ required: true }]}>
                    <Select options={props.categories} />
                </Form.Item>
>>>>>>> e4e750484a6f6f2e0432ca16a76298fe41cf4b8c
            </Form>
        </Modal>
    );
}