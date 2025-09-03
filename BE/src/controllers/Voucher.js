import Voucher from "../models/Voucher";

export const createVoucher = async (req, res) => {
    const { voucherCode, startDate, endDate, discount, typeOfDiscount, minBill, maxDiscount } = req.body;
    try {
        const startTime = new Date(startDate);
        const endTime = new Date(endDate);

        const findVoucherCode = await Voucher.findOne({ voucherCode });
        if (findVoucherCode) return res.status(409).json({ error: 'Voucher code đã tồn tại!' });

        if (startTime >= endTime) return res.status(422).json({ error: 'Start date must be before end date!' });

        if (discount <= 0) return res.status(422).json({ error: 'Discount must be a positive number' });
        if (minBill < 0) return res.status(422).json({ error: 'Min bill must be a positive number' });
        if (maxDiscount < 0) return res.status(422).json({ error: 'Max discount must be a positive number' });

        if (typeOfDiscount === 'percent') {
            if (discount >= 100) return res.status(422).json({ error: 'Discount can not higher more than 100 percent' });
        }

        const newVoucher = await Voucher.create(req.body);
        if (!newVoucher) return res.status(400).json({ error: 'Fail to create Voucher' });

        const populateVoucher = await newVoucher.populate([
            { path: 'categories' }
        ])

        return res.status(201).json(populateVoucher);
    } catch (error) {
        console.log('Lỗi ở createVoucher', error);
        return res.status(500).json({ message: 'Internal server', error: error.message })
    }
}

export const getAllVoucher = async (req, res) => {
    const { filterDelete, filterActive } = req.query;
    console.log('delete', filterDelete);
    console.log('active', filterActive);
    //sửa phần active
    try {
        let findAllVoucher = await Voucher.find().populate([
            { path: 'categories' }
        ]);

        if (!findAllVoucher) return res.status(404).json({ error: 'Voucher not found' });

        if (filterDelete && filterDelete === 'true') {
            findAllVoucher = findAllVoucher.filter(voucher => voucher.isDelete === false);
        }

        if (filterActive && filterActive === 'true') {
            findAllVoucher = findAllVoucher.filter(voucher => voucher.isActive === true);
        }

        return res.status(200).json(findAllVoucher);
    } catch (error) {
        console.log('Lỗi ở getAllVoucher', error);
        return res.status(500).json({ message: 'Internal server', error: error.message })
    }
}

export const getOneVoucher = async (req, res) => {
    const { idVoucher } = req.query;
    console.log(idVoucher)
    try {
        const findVoucher = await Voucher.findOne({ _id: idVoucher });
        if (!findVoucher) return res.status(404).json({ error: 'Voucher not found' });

        return res.status(200).json(findVoucher);
    } catch (error) {
        console.log('Lỗi ở getOneVoucher', error);
        return res.status(500).json({ message: 'Internal server', error: error.message });
    }
}

export const removeVoucher = async (req, res) => {
    const { _id } = req.body;
    try {
        const findVoucher = await Voucher.findOne({ _id });
        if (!findVoucher) return res.status(404).json({ error: 'Voucher not found' });

        findVoucher.isDelete = true;
        await findVoucher.save();

        return res.status(200).json(findVoucher);
    } catch (error) {
        console.log('Lỗi ở removeVoucher', error);
        return res.status(500).json({ message: 'Internal server', error: error.message });
    }
}

export const changeActiveVoucher = async (req, res) => {
    const { _id } = req.body;
    try {
        const findVoucher = await Voucher.findOne({ _id });
        if (!findVoucher) return res.status(404).json({ error: 'Voucher not found' });

        findVoucher.isActive = !findVoucher.isActive;
        await findVoucher.save();

        return res.status(200).json(findVoucher);
    } catch (error) {
        console.log('Lỗi ở changeActiveVoucher', error);
        return res.status(500).json({ message: 'Internal server', error: error.message });
    }
}

export const editVoucher = async (req, res) => {
    const { _id, startDate, endDate } = req.body;
    try {
        const findVoucher = await Voucher.findOne({ _id });
        if (!findVoucher) return res.status(404).json({ error: 'Voucher not found' });

        const startTime = new Date(startDate);
        const endTime = new Date(endDate);

        if (startTime >= endTime) return res.status(422).json({ error: 'Start date must be before end date!' });

        await Voucher.findByIdAndUpdate({ _id }, req.body, { new: true });
        const voucherAfterEdit = await Voucher.findOne({ _id }).populate('categories');
        if (!voucherAfterEdit) return res.status(404).json({ error: 'Complete edit but not found after edit' });

        return res.status(200).json(voucherAfterEdit);

    } catch (error) {
        console.log('Lỗi ở editVoucher', error.message);
        return res.status(500).json({ message: 'Internal server', error: error.message });
    }
}