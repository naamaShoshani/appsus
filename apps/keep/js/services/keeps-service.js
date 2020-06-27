import { notesContentData } from '../services/keep-service.js'
import utilService from '../services/keep-utils-service.js'
import keepStorageService from '../services/keep-storage-service.js'

// imports done ^


const KEEP_KEY = 'keeps';
let gKeeps = [];

function query() {
	gKeeps = keepStorageService.load(KEEP_KEY);
	if (!gKeeps) {
		gKeeps = notesContentData;
		keepStorageService.store(KEEP_KEY, gKeeps);
	}
	return Promise.resolve(gKeeps);
}

function deleteKeepById(keepId) {
	const keepIdx = getKeepIdx(keepId);
	gKeeps.splice(keepIdx, 1);
	keepStorageService.store(KEEP_KEY, gKeeps);
	return Promise.resolve()
}

function getKeepIdx(keepId) {
	return gKeeps.findIndex(keep => keep._id === keepId);
}

function getKeepById(id) {
	let keep = gKeeps.find(keep => keep._id === id);
	return Promise.resolve(keep);
}


function styleKeep(id, bgColor) {
	return getKeepById(id)
		.then(keep => {
			keep.bgColor = bgColor;
			keepStorageService.store(KEEP_KEY, gKeeps);
		});
}

function pinKeep(id) {
	return getKeepById(id)
		.then(keep => {
			keep.settings.isPinned = !keep.settings.isPinned;
			keepStorageService.store(KEEP_KEY, gKeeps);
		});
}


function editKeep(id) { 
	return getKeepById(id)
		.then(keep => {
			keep.settings.editMode = !keep.settings.editMode;
			keepStorageService.store(KEEP_KEY, gKeeps);
		});
}


function deleteTodo(keepId, idx) {
	return getKeepById(keepId)
	.then(keep => {
		keep.data.todos.splice(idx,1)
		keepStorageService.store(KEEP_KEY, gKeeps);
	});
	
 }


function markDoneTodo(keepId, idx) {
	return getKeepById(keepId)
	.then(keep => {
		keep.data.todos[idx].completed = !keep.data.todos[idx].completed;
		keepStorageService.store(KEEP_KEY, gKeeps);
	});
	
 }



function saveKeep(keep, data) {

	if (!keep) Promise.reject();
	switch (keep.settings.type) {
		case 'note-text':
			keep.data.text = data;
			break;
		case 'note-audio':
		case 'note-img':
		case 'note-video':
			keep.data.src = data;
			break;
		case 'note-todo':
			let listArr = data.split(',');
			keep.data.todos = listArr.map(item => {
				return { text: item, completed: false };
			});
			break;
	}
	if (keep._id) {	
		let keepIdx = gKeeps.findIndex(currKeep => currKeep._id === keep._id);
		gKeeps.splice(keepIdx, 1, keep);
	} else {
	
		keep._id = utilService.makeId();
		gKeeps.unshift(keep);
	}
	keepStorageService.store(KEEP_KEY, gKeeps);
	return Promise.resolve(keep);
}



export const keepService = {
	query,
	getKeepIdx,
	markDoneTodo,
	deleteTodo,
	deleteKeepById,
	styleKeep,
	saveKeep,
	pinKeep,
	editKeep
}