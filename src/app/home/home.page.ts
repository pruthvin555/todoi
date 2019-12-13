import { Component, ViewChild, OnInit } from '@angular/core';
import { IonList } from '@ionic/angular';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss']
})
export class HomePage {
	items = [
		{ status: 'pending', value: 'apple' },
		{ status: 'pending', value: 'banana' },
		{ status: 'pending', value: 'cherry' }
	];
	filterItems = [];
	txtInput = '';
	filterBy = 'all';

	ionViewDidEnter() {
		this.filterItems = this.items;
	}

	AddToDo(event: any) {
		if (!!this.txtInput) {
			this.items.push({ status: 'pending', value: this.txtInput });
			this.txtInput = '';
			console.log(event);
		}
	}

	doFilterStatus(event) {
		const selectedStatus = event.detail.value;
		if (selectedStatus == 'all') {
			this.filterItems = this.items;
		} else {
			this.filterItems = this.items.filter(item => item.status == selectedStatus);
		}
	}

	doComplete(item) {
		item.status = 'complete';
		console.log('do complete');
	}

	delete(i) {
		console.log('my delete works');
		this.items.splice(i, 1);
	}
}