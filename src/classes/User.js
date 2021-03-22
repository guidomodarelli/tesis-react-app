import validator from 'validator';
import { toTitleCase } from '../utils';

function isString(val) {
  return typeof val === 'string';
}

function isBoolean(val) {
  return typeof val === 'boolean';
}

class User {
  /**
   * @param {import('../redux/reducers/usersReducer').User} user
   */
  constructor(user = {}) {
    this.setId(user.id);
    this.setEmail(user.email);
    this.setPassword(user.password);
    this.setName(user.name);
    this.setBirthdate(user.birthdate);
    this.setBio(user.bio);
    this.setInstagram(user.instagram);
    this.setRole(user.role);
    this.setAddGroup(user.addGroup);
    this.setAddNewAdmins(user.addNewAdmins);
    this.setChangeGroupInfo(user.changeGroupInfo);
    this.setChangeGroupUser(user.changeGroupUser);
    this.setChangePermissionsAdmins(user.changePermissionsAdmins);
    this.setChangeRoutine(user.changeRoutine);
    this.setDeletePosts(user.deletePosts);
    this.setDeleteUsers(user.deleteUsers);
    this.setDeleteVotes(user.deleteVotes);
  }

  /**
   *
   * @param {string} id
   */
  setId(id) {
    if (id && !isString(id)) {
      if (!validator.isUUID(id, 4)) {
        throw new Error('El id debe ser un UUIDv4');
      }
    }
    this.id = id;
  }

  /**
   *
   * @param {string} email
   */
  setEmail(email) {
    if (!email) {
      throw new Error('email esta indefinido');
    }
    if (!validator.isEmail(email)) {
      throw new Error('email no es válido');
    }
    this.email = email;
  }

  /**
   *
   * @param {string} password
   */
  setPassword(password) {
    if (password && !isString(password)) {
      throw new Error('password no es de tipo string');
    }
    this.password = password;
  }

  /**
   *
   * @param {string} name
   */
  setName(name) {
    if (!name) {
      throw new Error('name esta indefinido');
    }
    if (!isString(name)) {
      throw new Error('name no es de tipo string');
    }
    this.name = toTitleCase(name);
  }

  /**
   *
   * @param {string} birthdate
   */
  setBirthdate(birthdate) {
    if (!birthdate) {
      throw new Error('birthdate esta indefinido');
    }
    if (!validator.isDate(birthdate)) {
      throw new Error('birthdate no es válido');
    }
    this.birthdate = birthdate;
  }

  /**
   *
   * @param {string?} bio
   */
  setBio(bio = '') {
    if (bio && typeof bio !== 'string') {
      throw new Error('bio no es de tipo string');
    }
    this.bio = bio;
  }

  /**
   *
   * @param {string?} instagram
   */
  setInstagram(instagram = '') {
    if (instagram && typeof instagram !== 'string') {
      throw new Error('instagram no es de tipo string');
    }
    this.instagram = instagram;
  }

  /**
   *
   * @param {'admin' | 'normal'} role
   * @default
   */
  setRole(role = 'normal') {
    const allowedValues = ['admin', 'normal'];
    if (!validator.isIn(role, allowedValues)) {
      throw new Error(
        `El rol debe ser ${Object.values(allowedValues).join(' o ')}`,
      );
    }
    this.role = role;
  }

  /**
   *
   * @param {boolean} value
   */
  setAddGroup(value = false) {
    if (!isBoolean(value)) {
      throw new Error('el valor no es de tipo boolean');
    }
    this.addGroup = value;
  }

  /**
   *
   * @param {boolean} value
   */
  setAddNewAdmins(value = false) {
    if (!isBoolean(value)) {
      throw new Error('el valor no es de tipo boolean');
    }
    this.addNewAdmins = value;
  }

  /**
   *
   * @param {boolean} value
   */
  setChangeGroupInfo(value = false) {
    if (!isBoolean(value)) {
      throw new Error('el valor no es de tipo boolean');
    }
    this.changeGroupInfo = value;
  }

  /**
   *
   * @param {boolean} value
   */
  setChangeGroupUser(value = false) {
    if (!isBoolean(value)) {
      throw new Error('el valor no es de tipo boolean');
    }
    this.changeGroupUser = value;
  }

  /**
   *
   * @param {boolean} value
   */
  setChangePermissionsAdmins(value = false) {
    if (!isBoolean(value)) {
      throw new Error('el valor no es de tipo boolean');
    }
    this.changePermissionsAdmins = value;
  }

  /**
   *
   * @param {boolean} value
   */
  setChangeRoutine(value = false) {
    if (!isBoolean(value)) {
      throw new Error('el valor no es de tipo boolean');
    }
    this.changeRoutine = value;
  }

  /**
   *
   * @param {boolean} value
   */
  setDeletePosts(value = false) {
    if (!isBoolean(value)) {
      throw new Error('el valor no es de tipo boolean');
    }
    this.deletePosts = value;
  }

  /**
   *
   * @param {boolean} value
   */
  setDeleteUsers(value = false) {
    if (!isBoolean(value)) {
      throw new Error('el valor no es de tipo boolean');
    }
    this.deleteUsers = value;
  }

  /**
   *
   * @param {boolean} value
   */
  setDeleteVotes(value = false) {
    if (!isBoolean(value)) {
      throw new Error('el valor no es de tipo boolean');
    }
    this.deleteVotes = value;
  }
}

export default User;
