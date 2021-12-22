(() => {
	const $ = document.querySelector.bind(document);

	let timer = 7000;
	let isRotating = false;
	let currentRotate = 0;

	const wheel = $('.wheel');
	const btnStart = $('.btn-start');
	const msg = $('.msg');

	/*---------- Chú ý: tổng phần trăm các phần thưởng = 100/100 ----------*/
	const listGift = [
		{
			txtName: 'Iphone 1',
			percent: 10 / 100,
		},
		{
			txtName: 'Iphone 2',
			percent: 20 / 100,
		},
		{
			txtName: 'Iphone 3',
			percent: 15 / 100,
		},
		{
			txtName: 'Iphone 4',
			percent: 15 / 100,
		},
		{
			txtName: 'Iphone 5',
			percent: 10 / 100,
		},
		{
			txtName: 'Iphone 6',
			percent: 10 / 100,
		},
		{
			txtName: 'Iphone 7',
			percent: 10 / 100,
		},
		{
			txtName: 'Iphone 8',
			percent: 10 / 100,
		},
	];

	const size = listGift.length;
	const rotate = 360 / size; //Số góc 1 phần thưởng chiếm trong vòng quay
	const skewY = 90 - rotate; //Độ nghiêng của 1 item

	const renderItem = () => {
		listGift.forEach((item, index) => {
			const itemGift = document.createElement('li');

			itemGift.style.transform = `
				rotate(${rotate * index}deg)
				skewY(-${skewY}deg)
			`;

			itemGift.innerHTML = `
				<p class="text-item ${index % 2 == 0 && 'even'}" 
					style="transform: skewY(${skewY}deg) 
						rotate(${rotate / 2}deg)"
				>
					<b>${item.txtName}</b>
				</p>
			`;

			wheel.appendChild(itemGift);
		});
	};

	const rotateWheel = (currentRotate, index) => {
		wheel.style.transform = `rotate(${
			currentRotate - index * rotate - rotate / 2
		}deg)`;
	};

	const getGift = randomNumber => {
		let currentPercent = 0;
		let list = [];

		listGift.forEach((item, index) => {
			currentPercent += item.percent;

			randomNumber <= currentPercent &&
				list.push({
					...item,
					index,
				});
		});

		return list[0];
	};

	const showTxtGift = txt => {
		setTimeout(() => {
			isRotating = false;
			msg.innerHTML = `Chúc mừng bạn đã trúng: ${txt}`;
		}, timer);
	};

	const start = () => {
		isRotating = true;
		msg.innerHTML = '';

		const random = Math.random();
		const gift = getGift(random);

		currentRotate += 360 * 10;

		rotateWheel(currentRotate, gift.index);
		showTxtGift(gift.txtName);
	};

	btnStart.addEventListener('click', () => {
		!isRotating && start();
	});

	renderItem();
})();
